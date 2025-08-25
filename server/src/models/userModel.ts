import mongoose, {Document} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


export interface IUser extends Document {
  email: string
  password: string
  generateAuthToken: () => string
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
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

 userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password: string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}


export const UserModel = mongoose.model("users", userSchema)