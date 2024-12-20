import { Socket } from 'socket.io-client'
import EventsSdkClass from '@/classes/events-sdk/events-sdk.class'
import StorageLogger, {
    ActionNameEnum,
    LevelEnum,
    LogTypeEnum
} from '@voicenter-team/socketio-storage-logger'
import type {
    LoggerDataPartial
} from '@voicenter-team/socketio-storage-logger'

export class LoggerClass {
    constructor (private readonly eventsSdkClass: EventsSdkClass) {
        this.eventsSdkClass = eventsSdkClass
    }

    private storageLogger: StorageLogger | undefined

    public init () {
        if (!this.eventsSdkClass.options.useLogger) {
            return
        }

        if (this.eventsSdkClass.options.storageLoggerInstance) {
            this.storageLogger = this.eventsSdkClass.options.storageLoggerInstance

            return
        }

        let socket: Socket | undefined

        if (this.eventsSdkClass.options.loggerSocketConnection) {
            socket = this.eventsSdkClass.options.loggerSocketConnection
        }

        if (this.eventsSdkClass.socketIoClass.ioFunction && !socket) {
            socket = this.eventsSdkClass.socketIoClass.ioFunction(
                this.eventsSdkClass.options.loggerServer,
                this.eventsSdkClass.options.loggerConnectOptions
            )
        }

        if (socket) {
            this.storageLogger = new StorageLogger<LoggerDataPartial>({
                socket,
                loggerOptions: this.eventsSdkClass.options.loggerConfig
            })
        }
    }

    stop () {
        if (!this.storageLogger) {
            return
        }

        this.storageLogger.stop()
    }

    public log (data: LoggerDataPartial) {
        if (this.eventsSdkClass.options.useLogger) {
            if (this.storageLogger) {
                if (data.Level === LevelEnum.INFO) {
                    this.storageLogger.log(data)
                } else if (data.Level === LevelEnum.ERROR) {
                    this.storageLogger.error(data)
                }
            } else {
                if (data.Level === LevelEnum.INFO) {
                    console.log(data)
                } else if (data.Level === LevelEnum.ERROR) {
                    console.error(data)
                }
            }
        }
    }

    public sdkInitializedLog () {
        const replacedOptions = {
            ...this.eventsSdkClass.options,
            token: 'CENSORED',
            password: 'CENSORED'
        }

        this.log({
            Message: 'Sdk initialized with provided options',
            Body: JSON.stringify(replacedOptions, this.eventsSdkClass.getCircularReplacer()),
            ActionName: ActionNameEnum.WSCONNECT,
            isShowClient: false,
            Status: 'Sdk initialized',
            StatusCode: 200,
            Level: LevelEnum.INFO,
            LogType: LogTypeEnum.INFO
        })
    }
}