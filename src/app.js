const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    
    try {
        const { firstName, lastName, emailId, password } = req.body;
        validateSignUpData(req);
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save();
        res.send("User Added succesfully");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if(!user) {
            throw new Error("Invalid credentials!");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid) {
            const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.send("Login successfull!!!");
        } else {
            throw new Error("Invalid credentials!");
        }
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if(!token) {
            throw new Error("Invalid token!");
        }
        const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedMessage;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User does not exists!");            
        }
        res.send(user);
    }
    catch (error) {
        res.status(400).send("ERROR : " + error.message);
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

app.patch("/user/:userId", async (req, res) => {
    try {
        const userId = req.params?.userId;
        const data = req.body;
        const ALLOWED_UPDATES = ['age', 'gender', 'skills', 'photoUrl', 'about'];
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed) {
            throw new Error("Update not allowed");            
        }
        if(data?.skills?.length > 10) {
            throw new Error("Skills cannot be more than 10");
        } 
        await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true });
        res.send("user updated successfully");
    } catch (error) {
        res.status(400).send("Update failed : " + error.message);
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
