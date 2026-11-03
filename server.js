import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.DATA_BASE).then(()=>{
    console.log("data base connected")
}).catch(err=>{
    console.log(err)
})
const port=process.env.PORT||5001


app.listen(port,()=>{
    console.log(`runngin ${port}`)
})