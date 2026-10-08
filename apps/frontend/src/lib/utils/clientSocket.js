import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const SOCKET_EVENT = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    ROOM_FULL: "roomFull",
    ROOM_USERS: "roomUsers",
    CONNECT_ERROR: "connect_error",
    ROOM_MESSAGE: "roomMessage",
    JOIN_ROOM: "joinRoom"
}

const socketUrl = "https://lx-pantos.deepfine.com:448";
let socket = null;

export function connect({
    handlers = {}
} = {}) {
    socket = io(socketUrl);

    if (handlers[SOCKET_EVENT.CONNECT]) {
        socket.once(SOCKET_EVENT.CONNECT, () =>
            handlers.connect(getSocketId())
        );
    }

    if (handlers[SOCKET_EVENT.DISCONNECT]) {
        socket.on(SOCKET_EVENT.DISCONNECT, (reason) =>
            handlers[SOCKET_EVENT.DISCONNECT](reason)
        );
    }

    if (handlers[SOCKET_EVENT.ROOM_FULL]) {
        socket.on(SOCKET_EVENT.ROOM_FULL, () => handlers.roomFull());
    }

    if (handlers[SOCKET_EVENT.ROOM_USERS]) {
        socket.on(SOCKET_EVENT.ROOM_USERS, (data) => handlers.roomUsers(data));
    }

    if (handlers[SOCKET_EVENT.CONNECT_ERROR]) {
        socket.on(SOCKET_EVENT.CONNECT_ERROR, (err) => handlers.connect_error(err));
    }

    if (handlers[SOCKET_EVENT.ROOM_MESSAGE]) {
        socket.on(SOCKET_EVENT.ROOM_MESSAGE, (data) => handlers.roomMessage(data));
    }
}

export function sendMessage(toSocketId, data) {
    socket.emit(
        SOCKET_EVENT.ROOM_MESSAGE,
        {
            toSocketId: toSocketId,
            data: data
        },
        (res) => {
            console.log(res);
        }
    )
}

export function joinRoom(roomId) {
    if (!socket?.connected) {
        alert("소켓 연결이 안되어 있습니다.");
        return;
    }

    socket.emit(SOCKET_EVENT.JOIN_ROOM, { roomId }, (res) => {
        if (!res.ok) {
            alert(`${res.reason}`);
        }
    });
}

export function disconnect() {
    if (!socket) return;

    socket.disconnect();
    socket.removeAllListeners();

    socket.close();
    socket = null;
}

const getSocketId = () => {
    if (socket == null) return null;
    return socket.id ?? null;
};