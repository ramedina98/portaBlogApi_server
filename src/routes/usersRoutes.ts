// here we have all the users routes...
import { Router } from "express";
import { getUser } from "../controllers/usersControllers";

const userRoutes = Router();

userRoutes.get('/userinfo', getUser);

export default userRoutes;