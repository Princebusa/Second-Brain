import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        required: true,
        type: String,
    }
})


export const UserModel = mongoose.model("users", userSchema)