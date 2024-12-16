import express from "express";
import { Server as SocketIOServer } from "socket.io";
import { chats } from "./data/data.js";
import { connectDB } from "./config/db.js";
import  dotenv  from "dotenv"; 
import  userRoutes  from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const PORT = process.env.PORT;
connectDB();
const app = express();
app.use(express.json()); // since we accept data from frontend

// Route handler for HTTP GET for root of app /
app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);


const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

const io = new SocketIOServer(server, {
    pingTimeout: 60000, // close connection after 60s if inactive to save bandwidth
    cors: {
        origin: "http://localhost:5173", // same as frontend
    },
})

io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on('setup', (userData) => {
        socket.join(userData._id); // create room with user
        console.log(userData._id);
        socket.emit("connected");
    })
})