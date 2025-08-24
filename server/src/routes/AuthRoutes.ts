import express from "express";
import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcrypt'
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: "User already exists", status: "failed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword)
    await UserModel.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully", status: "success" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/login", (req, res)=>{
    res.send("Login Route")
});

router.post("/de", (req, res)=>{
    res.send("de Route")
});

export default router;