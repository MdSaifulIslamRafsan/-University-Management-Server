import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// middleware
const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
     try {
      await schema.parseAsync({
          body: req.body,
          cookies: req.cookies
        });
       return next();
     } catch (error) {
      next(error)
     }
    };
  };

  export default validateRequest;