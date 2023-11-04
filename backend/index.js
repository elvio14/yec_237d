import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import {router as authRoute} from './user.js'
// import {router as courseRoute} from './course.js'
import {courseSchema} from './course.js'
import {degreeSchema} from './degree.js'

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

// app.use("api/auth", authRoute)
// app.use("api/course", courseRoute)


//user
const User_ = mongoose.model('user_', userSchema);

app.get("/api/user/:number", async (req,res) => {
    try{
        const user = await Course.find({number: req.params.number});
        
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})

//COurse
const Course = mongoose.model('Course_', courseSchema)

app.post("/api/course/add", async (req, res)=>{
    const newCourse = new Course({
        title: req.body.title,
        code: req.body.code,
        credit: req.body.credit,
        days: req.body.days,
        time: req.body.time,
        location: req.body.location,
        educator: req.body.educator,
        prereq: req.body.prereq,
    })

    try {
        const savedCourse = await newCourse.save()
        res.status(201).json(savedCourse)
    }   catch (err) {
        res.status(500).json(err)
    }
})

app.get("/api/course/all", async (req,res)=>{
    try{
        let courses;
        courses = await Course.find();
        
        res.status(200).json(courses);
    }catch(err){
        res.status(500).json(err);
    }
});


//degree

const Degree = mongoose.model('Degree_', degreeSchema)

app.get("/api/degree/:code", async (req,res)=>{
    try{
        const degree = await Degree.find({code: req.params.code});
        
        res.status(200).json(degree);
    }catch(err){
        res.status(500).json(err);
    }
});

app.get("/api/test", ()=>{
    console.log("test is successful!!")
})

app.listen(5000, ()=> {
    console.log('Backend server running.')
})