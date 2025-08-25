import express from "express";
import { ContentModel } from '../models/contentModel.js';
import bcrypt from 'bcrypt'
import {auth} from '../middlewares/auth.middleware.js'
import type {  AuthRequest } from '../middlewares/auth.middleware.js'
const router = express.Router();


router.post("/content", auth, async (req: AuthRequest, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})

router.get("/content", auth, async (req: AuthRequest, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

router.delete("/content", auth, async (req: AuthRequest, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

export default router