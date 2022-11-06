import express, { Application, Request, Response, Router } from "express";
import { User } from "./models/user.model";
import { v4 as uuidv4 } from "uuid";
import { getAutoSuggestUsers } from "./utils/index";
import { usersSchemaJoiObject } from "./validation/users.post.schema";
import { validateSchema } from "./validation/validate-schema";

const app: Application = express();
const router: Router = express.Router();

const PORT = process.env.PORT || 3000;

const storage: Map<string, User> = new Map();

app.use(express.json());
app.listen(PORT, () => console.log(`Server is starting at ${PORT}`));

router.route('/users/:id')
  .get(function(req: Request, res: Response) {
    const user = storage.get(req.params.id);
    if (user === undefined) {
      res.status(404).json ({ message: `User with id ${req.params.id} not found` })
    } else {
      res.json(user);
    }
  })
  .put(validateSchema(usersSchemaJoiObject), function(req: Request, res: Response) {
    const user = storage.get(req.params.id);
    if (user === undefined) {
      res.status(404).json ({ message: `User with id ${req.params.id} not found` })
    } else {
      storage.set(user.id, {...user, ...req.body});
      res.json(req.body);
    }
  })
  .delete(function(req: Request, res: Response) {
    const user = storage.get(req.params.id);
    if (user === undefined) {
      res.status(404).json ({ message: `User with id ${req.params.id} not found` })
    } else {
      storage.set(user.id, {...user, isDeleted: true});
      res.json(user);
    }
  })

router.route('/users')
.get(function(req: Request, res: Response) {
  const { limit, loginSubstring } = req.query;
  const normalizedLimit: number = parseInt(String(limit), 10);
  if (!normalizedLimit || !loginSubstring) {
    res.status(400).json ({ message: `Invalid request parameters` })
  } else {
    const users = getAutoSuggestUsers(storage, loginSubstring as string, normalizedLimit);
    res.json(users);
  }
})
.post(validateSchema(usersSchemaJoiObject), function(req: Request, res: Response) {
  const id = uuidv4();
  const user = {...req.body, id, isDeleted: false};
  storage.set(id, user);
  res.json(user);
})

app.use('/', router);
