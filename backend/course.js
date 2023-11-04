import mongoose from "mongoose"
import CryptoJS from "crypto-js"
import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

export const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    code: {type: String, required: true},
    credit: {type: Number},
    days: [{type: String}],
    time: [{type: String}],
    location: {type: String},
    educator: {type: String},
    prereq: [{type: String}],
},
{timestamps: true}
)