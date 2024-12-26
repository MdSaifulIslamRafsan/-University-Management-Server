import express, { Application, Request, Response } from 'express';
import cors from "cors";
import globalErrorHandler from './app/middleware/globalError';
import NotFoundPage from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app : Application = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:["https //localhost 5173"]}));


app.use("/api/v1", router);

app.get('/' , (req : Request, res : Response) => {
    // Promise.reject()
    
    res.send('Welcome to the Node.js and Express API');
})

// global error handler
app.use(globalErrorHandler);

// not found error handler
app.use(NotFoundPage);

export default app;
