import express, { Application, Request, Response } from 'express';
import cors from "cors";
import globalErrorHandler from './app/middleware/globalError';
import NotFoundPage from './app/middleware/notFound';
import router from './app/routes';
const app : Application = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get('/' , (req : Request, res : Response) => {
    
    res.send('Welcome to the Node.js and Express API');
})

// global error handler
app.use(globalErrorHandler);

// not found error handler
app.use(NotFoundPage);

export default app;
