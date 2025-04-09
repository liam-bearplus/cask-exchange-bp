// import { io, Socket } from 'socket.io-client';

// export class BaseSocketService {
//     protected socket: Socket | null = null;
//     protected namespace: string;

//     constructor(namespace: string) {
//         this.namespace = namespace;
//     }

//     connect(token: string) {
//         this.socket = io(`${process.env.NEXT_PUBLIC_WS_URL}/${this.namespace}`, {
//             auth: { token },
//             transports: ['websocket']
//         });
//     }

//     disconnect() {
//         if (this.socket) {
//             this.socket.disconnect();
//             this.socket = null;
//         }
//     }

//     isConnected(): boolean {
//         return this.socket?.connected || false;
//     }
// }
