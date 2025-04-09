// import { BaseSocketService } from "./baseSocket";

// class MessageSocketService extends BaseSocketService {
//     constructor() {
//         super("messages");
//     }

//     subscribeToMessages(callback: (data: any) => void) {
//         if (!this.socket) return;
//         this.socket.on("new_message", callback);
//     }

//     sendMessage(data: { roomId: string; message: string }) {
//         if (!this.socket) return;
//         this.socket.emit("send_message", data);
//     }

//     joinRoom(roomId: string) {
//         if (!this.socket) return;
//         this.socket.emit("join_room", { roomId });
//     }
// }

// export const messageSocket = new MessageSocketService();
