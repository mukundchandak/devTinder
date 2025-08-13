const mongoose = require("mongoose");

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
        maxlength: 50,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
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