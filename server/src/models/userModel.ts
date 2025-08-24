import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
       type: String, 
       unique: true, 
       lowercase: true
    },
    password:{
        required: true,
        type: String,
    }
})


export const UserModel = mongoose.model("users", userSchema)