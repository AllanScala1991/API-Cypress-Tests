import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { router } from './routes';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running...")
}) ;