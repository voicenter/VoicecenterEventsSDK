import { TypedSocketIo } from '@/classes/socket-io/versions'
import { SocketTyped } from '@/types/socket'
import { Server } from '@/classes/events-sdk/events-sdk.types'
import { ManagerOptions, SocketOptions } from 'socket.io-client'

export class SocketIoClass {
    public io: SocketTyped | undefined
    public ioFunction: TypedSocketIo | undefined
    public server: Server | undefined
    public servers: Server[] | undefined

    public initSocketConnection (token: string, protocol: string) {
        try {
            const domain = this.server?.Domain

            const url = `${protocol}://${domain}`

            // this.log(INFO, 'Connecting to..', url);

            // this.closeAllConnections()

            const options: Partial<ManagerOptions & SocketOptions> = {
                reconnection: false,
                upgrade: false,
                transports: [ 'websocket' ],
                query: {
                    token
                }
            }

            if (token) {
                options.query = {
                    token
                }
            }

            if (this.ioFunction) {
                console.log('init io function...')
                console.log(url, options)
                this.io = this.ioFunction(url, options)
            }

            // allConnections.push(this.socket);
        } catch (e) {
            // this.log(ERROR, e);
        }
    }

    public setServer (server: Server) {
        this.server = server
    }

    public setServersByURLList (URLList: string[]) {
        this.servers = URLList.map((url, index) => {
            return {
                Priority: index,
                Domain: url.replace('https://', '')
            }
        })
    }
}
