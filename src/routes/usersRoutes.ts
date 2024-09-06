// here we have all the users routes...
import { Router } from "express";
import { getUser, loginSession, putUpdatedUserInfo} from "../controllers/usersControllers";

const userRoutes = Router();

userRoutes.get('/login', loginSession);
userRoutes.get('/userinfo', getUser);
// TODO: hacer pruebas de este endpoint...
userRoutes.put('/updateuserinfo', putUpdatedUserInfo);

export default userRoutes;