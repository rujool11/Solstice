import express from "express";
import { chats } from "./data/data.js";

const app = express();

// Route handler for HTTP GET for root of app /
app.get("/", (req, res) => {
    res.send("API is running");
});


// /api/chat get, send all dummy chats
app.get("/api/chat", (req, res) => {
    res.send(chats);
});

// when id is specified, log id and search chats object for chat whose id matches requested id, 
// and send it in resonse
// .find(x) , where x is a function which determines if find returns true based on function evaluation
app.get("/api/chat/:id", (req, res) => {
    console.log(req.params.id);
    const oneChat = chats.find(c => c._id === req.params.id);
    res.send(oneChat);
});

const PORT = 5000;

app.listen(5000, () => {
    console.log(`Server started on port ${PORT}`);
});