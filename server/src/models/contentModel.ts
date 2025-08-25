import mongoose, {model, Schema} from "mongoose";


const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'users', required: true },
})

export const ContentModel = model("content", ContentSchema)