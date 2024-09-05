// here we have all the users routes...
import { Router } from "express";
import { getUser, loginSession} from "../controllers/usersControllers";

const userRoutes = Router();

userRoutes.get('/login', loginSession);
userRoutes.get('/userinfo', getUser);

export default userRoutes;