import express from "express";
import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { auth } from '../middlewares/auth.middleware.js'
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: "User already exists", status: "failed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await UserModel.create({
      email,
      password: hashedPassword,
    });
    await createUser.save()


    const token: string = createUser.generateAuthToken()

    return res.status(201).json({ message: "User created successfully", token, status: "success" });

  } catch (error) {

    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials", status: "failed" })
    }

    const verify = await user.comparePassword(password)

    if (!verify) {
      return res.status(400).json({ message: "Invalid credentials", status: "failed" })
    }
    const token = user.generateAuthToken()

    return res.status(200).json({message: "Login successful", token, status: "success"})

  } catch (err) {
    return res.status(500).json({ message: "Server error" })
  }
});



export default router;