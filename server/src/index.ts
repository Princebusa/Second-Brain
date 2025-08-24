import express from 'express';
import { connectToMongo } from './db/mongo.js';
import dotenv from "dotenv";
import authRouter from './routes/AuthRoutes.js';
dotenv.config();

 await connectToMongo()
const app = express();
 
app.use(express.json());
app.use("/api/v1", authRouter)

app.listen(3000, async () => {
   
  console.log('Server is running on port 3000');
});