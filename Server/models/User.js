const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please Input User Name!"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please Input Email!"],
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw Error("Please Provide a valid Email address")
            }
        }
    },
    role: {
        type: String,
        enum: ['admin', 'owner'],
        default: 'owner'
    },

    password: {
        type: String,
        required: [true, "Please Input Password!"],
        minlength: 7,
        trim: true
    },
    passwordConfirm: {
        type: String,
        minlength: 7,
        trim: true,
        required: [true, "Please Input Password Confirmation!"],
        validate(value) {
            if (this.password !== this.passwordConfirm) {
                return true;
            }
        }
    },
    tokens: [
        {
            token: { type: String }
        },
    ]
}, { timestamps: true }
);

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, "kiki", {
        expiresIn : "1 days",
    });

    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.passwordConfirm;
    delete userObject.tokens;

    return userObject;
}

//login cek
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        throw Error("User Not Found!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw Error("Wrong Password!");
    }

    return user;
}

//hashing password
userSchema.pre("save", async function(next){
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    if (user.isModified("passwordConfirm")) {
        user.passwordConfirm = await bcrypt.hash(user.passwordConfirm, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;