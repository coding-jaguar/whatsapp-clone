import http from "http";
import app from "./app";
import { setupSocketIO } from "./sockets/socketHandlers";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

// Initialize Socket.IO
setupSocketIO(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
