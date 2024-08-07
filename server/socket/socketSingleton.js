let io;

module.exports = {
    init: (httpServer) => {
        if (!io) {
            io = require('socket.io')(httpServer, {
                cors: {
                    origin: "*",        // Allow all origins
                    methods: ["GET", "POST"], // Allowed request methods
                    transports: ['websocket'] // Use WebSocket only
                },
            });
        }
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        return io;
    }
};
