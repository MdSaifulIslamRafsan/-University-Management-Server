import express, { Application, Request, Response } from 'express';
import cors from "cors";
const app : Application = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.get('/' , (req : Request, res : Response) => {
    res.send('Welcome to the Node.js and Express API');
})

export default app;
