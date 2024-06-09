import express from "express";

const app = express();

// Route handler for HTTP GET for root of app /
app.get('/', (req, res) => {
    res.send("API is running");
});

app.listen(5000, () => {
    console.log("server started at port 5000");
});