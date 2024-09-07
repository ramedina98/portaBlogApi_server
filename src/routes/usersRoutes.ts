// here we have all the users routes...
import { Router } from "express";
import { getUser, loginSession, putUpdatedUserInfo} from "../controllers/usersControllers";

const userRoutes = Router();

userRoutes.get('/login', loginSession);
userRoutes.get('/userinfo', getUser);
userRoutes.put('/updateuser', putUpdatedUserInfo);

export default userRoutes;