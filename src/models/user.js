const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        reqired: true,
        maxlength: 50,
    },
    lastName: {
        type: String,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong password");
            }
        },
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address : " + value);
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', 'female', 'others'].includes(value)) {
                throw new Error("gender data not valid");                
            } else return;
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid Photo URL : " + value);
            }
        },
    },
    about: {
        type: String,
        default: "This is a default about of user!",
        maxlength: 255,
    },
    skills: {
        type: [String],
    }
  }, 
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);