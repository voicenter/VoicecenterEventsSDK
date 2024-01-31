import md5 from 'js-md5'

import EventsSdkClass from '@/classes/events-sdk/events-sdk.class'
import { Environment, EventsSdkOptions, ServerParameter } from '@/classes/events-sdk/events-sdk.types'
import {
    ExternalLoginRequestBody,
    ExternalLoginResponse,
    LoginSessionData,
    LoginSessionPayload,
    Settings
} from '@/types/auth'
import { LoginType } from '@/enum/auth.enum'
import { getSettingsUrl, newLoginUrl, refreshTokenUrl } from '@/classes/auth/auth.urls'

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

        this.storageKey = md5(JSON.stringify(payload))

        if (this.lastLoginTimestamp && this.lastLoginTimestamp + this.delay > new Date().getTime()) {
            return
        }

        this.updateLastLoginTimestamp()

        const isLoggedIn = await this.checkLoginStatus(options.environment, this.storageKey)

        if (!isLoggedIn) {
            await this.userLoginFunction(payload, this.storageKey, options.loginType)
        }
    }

    public updateLastLoginTimestamp () {
        this.lastLoginTimestamp = new Date().getTime()
    }

    private async checkLoginStatus (environment: Environment, key: string): Promise<boolean> {
        let loginSessionData: LoginSessionData
        if (environment === Environment.BROWSER && window) {
            const loginSessionKey = window.sessionStorage.getItem(key)

            if (loginSessionKey) {
                loginSessionData = JSON.parse(loginSessionKey)

                this.onLoginResponse(loginSessionData)

                return true
            }
        }
        if (environment === Environment.CHROME_EXTENSION && chrome) {
            const loginSessionKey = await chrome.storage.session.get(key)

            if (loginSessionKey[key]) {
                loginSessionData = JSON.parse(loginSessionKey[key])

                this.onLoginResponse(loginSessionData)

                return true
            }
        }
        return false
    }

    private onLoginResponse (loginSessionData: LoginSessionData) {
        if (loginSessionData.MonitorList && loginSessionData.MonitorList.length) {
            this.eventsSdkClass.servers = [ ...loginSessionData.MonitorList ]
            this.eventsSdkClass.server = this.eventsSdkClass.servers.reduce((prev, current) =>
                (prev.Priority > current.Priority) ? prev : current
            )
        }
        if (this.eventsSdkClass.server) {
            this.eventsSdkClass.socketIoClass.getSocketIoFunction(`v=${this.eventsSdkClass.server.Version}`)
        }
        if (loginSessionData.IdentityCode) {
            this.token = loginSessionData.IdentityCode
            this.eventsSdkClass.connect(ServerParameter.DEFAULT, true)
        }
        if (loginSessionData.RefreshToken && loginSessionData.IdentityCodeExpiry && this.eventsSdkClass.options.loginType === LoginType.USER) {
            this.eventsSdkClass.options.refreshToken = loginSessionData.RefreshToken
            this.eventsSdkClass.options.tokenExpiry = loginSessionData.IdentityCodeExpiry
            this.handleTokenExpiry()
        }
    }

    private async userLoginFunction (
        payload: LoginSessionPayload,
        key: string,
        loginType: LoginType,
    ) {
        const externalLoginResponse = await this.externalLogin(
            newLoginUrl,
            payload,
            loginType,
        )

        const settings = await this.getSettings(externalLoginResponse.Data.AccessToken)

        const loginSessionData: LoginSessionData = {
            ...externalLoginResponse.Data,
            ...settings
        }

        this.onLoginResponse(loginSessionData)

        await this.updateStorageKey(loginSessionData, this.eventsSdkClass.options.environment, key)
    }

    public handleTokenExpiry () {
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
                if (refreshTokenUrl && this.eventsSdkClass.options.refreshToken) {
                    this.eventsSdkClass.socketIoClass.closeAllConnections()

                    const refreshTokenResponse = await this.refreshToken(refreshTokenUrl, this.eventsSdkClass.options.refreshToken)

                    const settings = await this.getSettings(refreshTokenResponse.Data.AccessToken)

                    const loginSessionData: LoginSessionData = {
                        ...refreshTokenResponse.Data,
                        ...settings
                    }

                    this.onLoginResponse(loginSessionData)

                    await this.updateStorageKey(loginSessionData, this.eventsSdkClass.options.environment, this.storageKey)
                }
            },
            maxAllowedTimeout)
    }

    private async updateStorageKey (storageData: LoginSessionData, environment: Environment, key: string) {
        if (environment === Environment.BROWSER) {
            window.sessionStorage.setItem(key, JSON.stringify(storageData))
        }
        if (environment === Environment.CHROME_EXTENSION) {
            await chrome.storage.session.set({
                [key]: JSON.stringify(storageData)
            })
        }
    }

    private async externalLogin (
        url: string,
        { password, token, email }: LoginSessionPayload,
        loginType: LoginType,
    ): Promise<ExternalLoginResponse> {
        let body: ExternalLoginRequestBody

        if (loginType === LoginType.TOKEN) {
            body = {
                identityType: LoginType.TOKEN,
                token
            }
        } else {
            body = {
                identityType: LoginType.USER,
                username: email,
                password,
            }
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })

        const data = await res.json()

        if (data.error) {
            throw new Error(data.error)
        }
        return data
    }

    private async getSettings (token: string): Promise<Settings> {
        const res = await fetch(getSettingsUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.json()
    }

    private async refreshToken (refreshTokenUrl: string, oldRefreshToken: string): Promise<ExternalLoginResponse> {
        const res = await fetch(refreshTokenUrl, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${oldRefreshToken}`
            }
        })
        return res.json()
    }
}

export default AuthClass
