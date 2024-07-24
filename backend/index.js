import express from "express";
import { chats } from "./data/data.js";
import { connectDB } from "./config/db.js";
import  dotenv  from "dotenv"; 
import  userRoutes  from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
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

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});