import mongoose from "mongoose"
import CryptoJS from "crypto-js"
import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
},
{timestamps: true}
)

const User = mongoose.model('User', userSchema)

//Register
router.post("/register", async (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }   catch (err) {
        res.status(500).json(err);
    }
})

router.post("/login", async (req, res)=>{
    try {
        const user = await User.findOne({ username: req.body.username});
        !user && res.status(401).json("Oops, Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriPassword !== req.body.password &&
            res.status(401).json("Wrong password..");

            const accessToken = jwt.sign({
                id:user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        );

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
})

export {router}