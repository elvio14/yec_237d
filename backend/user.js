import mongoose from "mongoose"
import CryptoJS from "crypto-js"
import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

export const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    number: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'student'},
    degreeCodes: [{type: String}],
    completedCourses: [{type: String}],
    teachingCodes: [{type: String}]
},
{timestamps: true}
)

//Register
router.post("/register", async (req, res)=>{
    const newUser = new User_({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        number: req.body.number,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        role: req.body.role,
        degreeCodes: req.body.degreeCodes,
        teachingCodes: req.body.teachingCodes,
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }   catch (err) {
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res)=>{
    try {
        const user = await User.findOne({ username: req.body.username})
        !user && res.status(401).json("Oops, Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        OriPassword !== req.body.password &&
            res.status(401).json("Wrong password..")

            const accessToken = jwt.sign({
                id:user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        );

        const { password, ...others } = user._doc

        res.status(200).json({...others, accessToken})
    } catch (err) {
        res.status(500).json(err)
    }
})