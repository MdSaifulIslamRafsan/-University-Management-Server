import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { StudentRoutes } from './app/modules/students/student.route';
const app : Application = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.use("/api/v1/students", StudentRoutes)

app.get('/' , (req : Request, res : Response) => {
    res.send('Welcome to the Node.js and Express API');
})

export default app;
