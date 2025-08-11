const express = require("express");

const app = express();


app.use("/hello", (req, res) => {
    res.send("Hello hello hello!");
});

app.use("/test", (req, res) => {
    res.send("Hello from the server!");
});

app.use("/", (req, res) => {
    res.send("Namaste Mukund!");
});

app.listen(7777, () => {
    console.log("Server is succesfully listening on port 7777...")
})