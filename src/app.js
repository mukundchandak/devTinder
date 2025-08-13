const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {

    try {
        const user = new User(req.body)
        await user.save();
        res.send("User Added succesfully");
    } catch (err) {
        res.status(400).send("Error saving the user : " + err.message);
    }
});

app.get("/user", async (req, res) => {

    try {
        const userEmail = req.body.emailId;
        const user = await User.findOne({ emailId: userEmail });
        if(!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});

app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});

app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

app.patch("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        const data = req.body;
        await User.findByIdAndUpdate({ _id: userId }, data);
        res.send("user updated successfully");
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
});

connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
        console.log("Server is succesfully listening on port 7777...")
    });
}).catch((err) => {
    console.error(err);
});
