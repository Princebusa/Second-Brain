import express from "express";
import { UserModel } from '../models/userModel.js';
const router = express.Router();

router.post("/signup", (req, res)=>{
    const {username, password} = req.body;
   

    UserModel.create({
      username,
      password
    })
     res.send("Register Route")
})


router.post("/login", (req, res)=>{
    res.send("Login Route")
});

export default router;