import mongoose from "mongoose"
import CryptoJS from "crypto-js"
import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

export const degreeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    term: {type: String, required: true},
    code: {type: String},
    f1: [{type:String}],
    w1: [{type:String}],
    f2: [{type:String}],
    w2: [{type:String}],
    f3: [{type:String}],
    w3: [{type:String}],
    f4: [{type:String}],
    w4: [{type:String}],
},
{timestamps: true}
)



router.post("/", async (req, res)=>{
    const newDegree = new Degree({
        title: req.body.title,
        term: req.body.term,
        code: req.body.code,
        reqCourses: req.body.reqCourses,
    })

    try {
        const savedDegree = await newDegree.save()
        res.status(201).json(savedDegree)
    }   catch (err) {
        res.status(500).json(err)
    }
})