import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {router as authRoute} from './user.js'

export const app = express()
app.use(express.json())
dotenv.config()

mongoose.connect(
    process.env.MONGODB_URI
)
.then(() => console.log('DB Connected.'))
.catch((err) => {
    console.log(err)
})

app.use('api/auth', authRoute)

app.listen(5000, ()=> {
    console.log('Backend server running.')
})