import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import route from "./routes/studentRouter";
import path from 'path'


const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.set('/',express.static(path.join(__dirname,'/src/views')))


const MONGO_URL="mongodb://localhost:27017"
mongoose.connect(MONGO_URL,{
    dbName:'CRUD-Using-TS'
})
.then(()=>{
    console.log('mongoose connected.....');
})
.catch((error)=>console.log('error will show on the database connection',error))

app.use('/',route)

app.listen(4000,()=>{
    console.log(`server is running on http://localhost:4000`);
    
})