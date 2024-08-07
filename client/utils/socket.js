import io from 'socket.io-client';

const initializeSocket = () => {
    if (typeof window !== "undefined") {
        // Client-side-only code
        const SERVER_URL = process.env.NEXT_PUBLIC_API_END_POINT;

        const socket = io(SERVER_URL, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            secure: process.env.NODE_ENV === 'production'|| 'staging',
        });

        return socket;
    }
    return null;
};

const socket = initializeSocket();

export default socket;
