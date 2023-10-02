const User = require("../models/User");

module.exports = {
    addUser : async(req, res) => {
        try {
            const { 
                userName,
                email,
                role,
                password,
                passwordConfirm
            } = req.body;

            if(password != passwordConfirm) {
                throw Error("Your password doesn't match with password confirm");
            }

            const cekUserName = await User.find({
                userName: userName
            }).count();
            const cekEmail = await User.find({
                email: email
            }).count();

            if(cekUserName + cekEmail > 0) {
                throw Error("Email or Username already registered");
            }

            const user = new User(req.body);
            await user.save();
            res.status(201).json({ message: "Success sign up, please login" });
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    viewUser : async(req, res) => {
        try {
            const user = await User.find();

            user.length === 0
                ? res.status(404).json({ message: "No data user found" })
                : res.status(200).json(user);
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateUser : async(req, res) => {
        const updates = Object.keys(req.body);
        const allowUpdates = [ "userName", "email", "role", "password", "passwordConfirm" ];
        const isValidOperation = updates.every((update) => allowUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(403).json({ message : "Invalid key parameter" })
        }

        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ message : "User not found" })
            }
            updates.forEach((update) => {
                user[update] = req.body[update];
            });

            await user.save();
            res.status(200).json(user);
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteUser : async(req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            user
                ? res.status(200).json({ message: "User deleted" })
                : res.status(404).json({ message: "User not found" });
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    login : async(req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password);
            const token = await user.generateAuthToken();
            const username = user.userName;

            res.status(200).json({ username, token });
        }
        catch(err) {
            res.status(400).json({ message: err.message });
        }
    },
    logout : async(req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => token.token === req.user.token);

            await req.user.save();
            res.status(200).json({ message: "Success logout" });
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    logoutAll : async(req, res) => {
        try {
            req.user.tokens = [];

            await req.user.save();
            res.status(200).json({ message: "Success logout" });
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    viewMe : async(req, res) => {
        res.send(req.user);
    }
}