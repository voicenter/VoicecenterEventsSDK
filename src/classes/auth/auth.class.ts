import md5 from 'md5'

import EventsSdkClass from '@/classes/events-sdk/events-sdk.class'
import { EventsSdkOptions, ServerParameter } from '@/classes/events-sdk/events-sdk.types'
import {
    ExternalLoginNewStackResponseData,
    ExternalLoginOldStackResponseData,
    ExternalLoginResponse,
    LoginSessionData,
    LoginSessionPayload,
    Settings
} from '@/types/auth'
import { LoginType } from '@/enum/auth.enum'
import { StorageClass } from '@/classes/storage/storage.class'
import { LoggerTypeEnum } from '@/enum/logger.enum'

class AuthClass{
    constructor (private readonly eventsSdkClass: EventsSdkClass) {
        this.eventsSdkClass = eventsSdkClass

        this.storageKey = ''
    }

    private delay = 1000
    public lastLoginTimestamp: number | undefined
    public token: string | undefined

    private storageKey: string

    public async login (options: EventsSdkOptions) {
        const payload: LoginSessionPayload = {
            token: options.token,
            email: options.email,
            password: options.password
        }

        this.storageKey = md5(JSON.stringify(options))

        if (this.lastLoginTimestamp && this.lastLoginTimestamp + this.delay > new Date().getTime()) {
            return
        }

        this.updateLastLoginTimestamp()

        const isLoggedIn = await this.checkLoginStatus(this.storageKey)

        if (!isLoggedIn) {
            StorageClass.clearSessionStorage()

            await this.userLoginFunction(payload, this.storageKey, options.loginType)
        }
    }

    public updateLastLoginTimestamp () {
        this.lastLoginTimestamp = new Date().getTime()
    }

    private async checkLoginStatus (key: string): Promise<boolean> {
        const loginSessionData = await StorageClass.getSessionStorageDataByKey<LoginSessionData>(key)

        if (loginSessionData) {
            this.onLoginResponse(loginSessionData)

            return true
        }

        return false
    }

    private async userLoginFunction (
        payload: LoginSessionPayload,
        key: string,
        loginType: LoginType,
    ) {
        let externalLoginResponse

        let settings

        let loginSessionData: Partial<LoginSessionData>

        if (this.eventsSdkClass.options.isNewStack) {
            externalLoginResponse = await this.externalLogin<ExternalLoginNewStackResponseData>(
                this.eventsSdkClass.options.loginUrl,
                payload,
                loginType,
            )

            settings = await this.getSettings(externalLoginResponse.Data.AccessToken)

            loginSessionData = {
                ...externalLoginResponse.Data,
                ...settings
            }
        } else {
            externalLoginResponse = await this.externalLogin<ExternalLoginOldStackResponseData>(
                this.eventsSdkClass.options.loginUrl,
                payload,
                loginType,
            )

            loginSessionData = {
                ...externalLoginResponse.Data.Socket,
            }
        }

        this.onLoginResponse(loginSessionData)

        await StorageClass.updateSessionStorageKey(key, loginSessionData)
    }

    private onLoginResponse (loginSessionData: Partial<LoginSessionData>) {
        if (loginSessionData.MonitorList && loginSessionData.MonitorList.length) {
            this.eventsSdkClass.servers = [ ...loginSessionData.MonitorList ]
            this.eventsSdkClass.server = this.eventsSdkClass.servers.reduce((prev, current) =>
                (prev.Priority > current.Priority) ? prev : current
            )
        }
        if (!this.eventsSdkClass.options.isNewStack && this.eventsSdkClass.options.servers) {
            this.eventsSdkClass.servers = [ ...this.eventsSdkClass.options.servers ]
            this.eventsSdkClass.server = this.eventsSdkClass.servers.reduce((prev, current) =>
                (prev.Priority > current.Priority) ? prev : current
            )
        }
        if (this.eventsSdkClass.options.isNewStack && this.eventsSdkClass.options.servers) {
            this.eventsSdkClass.servers = [ ...this.eventsSdkClass.options.servers ]
            this.eventsSdkClass.server = this.eventsSdkClass.servers.reduce((prev, current) =>
                (prev.Priority > current.Priority) ? prev : current
            )
        }
        if (!this.eventsSdkClass.options.isNewStack && !this.eventsSdkClass.servers.length && loginSessionData.URLList) {
            this.eventsSdkClass.URLList = loginSessionData.URLList
        }
        if (!this.eventsSdkClass.options.isNewStack && !this.eventsSdkClass.URLList.length && !this.eventsSdkClass.servers.length) {
            throw new Error('Socket servers not defined')
        }
        if (this.eventsSdkClass.options.isNewStack && !this.eventsSdkClass.servers.length) {
            throw new Error('Socket servers not defined')
        }
        if (this.eventsSdkClass.server) {
            this.eventsSdkClass.socketIoClass.getSocketIoFunction(`v=${this.eventsSdkClass.server.Version}`)
            this.eventsSdkClass.loggerClass.init()
        }
        if (!this.eventsSdkClass.server && this.eventsSdkClass.URLList.length) {
            this.eventsSdkClass.socketIoClass.getSocketIoFunction(`v=${loginSessionData.Client}`)
        }
        if (loginSessionData.IdentityCode) {
            this.token = loginSessionData.IdentityCode
            this.eventsSdkClass.connect(ServerParameter.MAIN)
        }
        if (loginSessionData.Token) {
            this.token = loginSessionData.Token
            this.eventsSdkClass.connect(ServerParameter.MAIN)
        }
        if (loginSessionData.RefreshToken && loginSessionData.IdentityCodeExpiry && this.eventsSdkClass.options.loginType === LoginType.USER) {
            this.eventsSdkClass.options.refreshToken = loginSessionData.RefreshToken
            this.eventsSdkClass.options.tokenExpiry = loginSessionData.IdentityCodeExpiry
            this.handleTokenExpiry()
        }
        if (loginSessionData.RefreshToken && loginSessionData.TokenExpiry && this.eventsSdkClass.options.loginType === LoginType.USER) {
            this.eventsSdkClass.options.refreshToken = loginSessionData.RefreshToken
            this.eventsSdkClass.options.tokenExpiry = loginSessionData.TokenExpiry
            this.handleTokenExpiry()
        }
    }

    public handleTokenExpiry () {
        if (!this.eventsSdkClass.options.refreshTokenUrl) {
            throw new Error('refreshTokenUrl not provided')
        }

        let date: Date

        if (this.eventsSdkClass.options.tokenExpiry) {
            date = new Date(this.eventsSdkClass.options.tokenExpiry)
        } else {
            return
        }

        const timeout = date.getTime() - new Date().getTime() - 5000 // 5 seconds before expire

        const maxAllowedTimeout = Math.min(timeout, 0x7FFFFFFF)

        setTimeout(
            async () => {
                if (this.eventsSdkClass.options.refreshToken) {
                    this.eventsSdkClass.socketIoClass.closeAllConnections()

                    let settings

                    let loginSessionData: Partial<LoginSessionData>

                    if (this.eventsSdkClass.options.isNewStack) {
                        const refreshTokenResponse = await this.refreshToken<ExternalLoginNewStackResponseData>(
                            this.eventsSdkClass.options.refreshTokenUrl,
                            this.eventsSdkClass.options.refreshToken
                        )

                        settings = await this.getSettings(refreshTokenResponse.Data.AccessToken)

                        loginSessionData = {
                            ...refreshTokenResponse.Data,
                            ...settings
                        }
                    } else {
                        const refreshTokenResponse = await this.refreshToken<ExternalLoginOldStackResponseData>(
                            this.eventsSdkClass.options.refreshTokenUrl,
                            this.eventsSdkClass.options.refreshToken
                        )

                        loginSessionData = {
                            ...refreshTokenResponse.Data.Socket,
                        }
                    }

                    this.onLoginResponse(loginSessionData)

                    await StorageClass.updateSessionStorageKey(this.storageKey, loginSessionData)
                }
            },
            maxAllowedTimeout)
    }

    private async externalLogin<T> (
        url: string,
        { password, token, email }: LoginSessionPayload,
        loginType: LoginType,
    ): Promise<ExternalLoginResponse<T>> {
        if (!url) {
            throw new Error('loginUrl not provided')
        }

        let body: string

        if (this.eventsSdkClass.options.isNewStack) {
            if (loginType === LoginType.TOKEN) {
                body = JSON.stringify({
                    identityType: LoginType.TOKEN,
                    token
                })
            } else {
                body = JSON.stringify({
                    identityType: LoginType.USER,
                    username: email,
                    password,
                })
            }
        } else {
            if (this.eventsSdkClass.options.loginType === LoginType.TOKEN) {
                body = JSON.stringify({ token })

                url = `${url}/${LoginType.TOKEN}`
            } else {
                body = JSON.stringify({
                    email,
                    pin: password
                })

                url = `${url}/${LoginType.USER}`
            }
        }

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body,
            })

            if (!res.ok && res.status === 400) {
                throw new Error('Bad body request. Login type or isNewStack values not correct or not provided')
            }

            if (!res.ok && res.status === 401) {
                throw new Error('Unauthorized. Invalid token provided')
            }

            if (!res.ok && res.status === 403) {
                throw new Error('Forbidden. Identity token not provided or not valid')
            }

            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }
            return data
        } catch (error) {
            this.eventsSdkClass.loggerClass.log(
                LoggerTypeEnum.ERROR,
                `External login ${url}`,
                error
            )

            throw error
        }
    }

    private async getSettings (token: string): Promise<Settings> {
        try {
            if (!this.eventsSdkClass.options.getSettingsUrl) {
                throw new Error('getSettingsUrl not provided')
            }

            const res = await fetch(this.eventsSdkClass.options.getSettingsUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!res.ok && res.status === 401) {
                throw new Error('Unauthorized. Access token not provided or not valid')
            }

            return res.json()
        } catch (error) {
            this.eventsSdkClass.loggerClass.log(
                LoggerTypeEnum.ERROR,
                `Get settings ${this.eventsSdkClass.options.getSettingsUrl}`,
                error
            )

            throw error
        }
    }

    private async refreshToken<T> (refreshTokenUrl: string, oldRefreshToken: string): Promise<ExternalLoginResponse<T>> {
        try {
            const res = await fetch(refreshTokenUrl, {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${oldRefreshToken}`
                }
            })
            return res.json()
        } catch (error) {
            this.eventsSdkClass.loggerClass.log(
                LoggerTypeEnum.ERROR,
                `Refresh token ${refreshTokenUrl}`,
                error
            )

            throw error
        }
    }
}

export default AuthClass
