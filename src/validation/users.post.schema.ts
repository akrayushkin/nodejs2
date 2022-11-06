import Joi from "joi";

import { JoiUserSchema } from "../models/user.model";

const usersSchema: JoiUserSchema = {
  id: Joi.string(),
  login: Joi.string().trim().min(2).required(),
  password: Joi.string().trim().alphanum().min(8).required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean()
};

export const usersSchemaJoiObject: Joi.ObjectSchema<JoiUserSchema> = Joi.object(usersSchema);
