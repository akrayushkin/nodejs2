import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { JoiUserSchema } from "../models/user.model";
import { errorResponse } from "./error-response";

export const validateSchema = (schema: ObjectSchema<JoiUserSchema>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error !== undefined) {
      res.status(400).json(errorResponse(error.details));
    } else {
      req.body = value;
      next();
    }
  }
}
