/**
 * @module users
 * here we have all the users routes...
 */
import { Router } from "express";
import { getUser, loginSession, putUpdatedUserInfo} from "../controllers/usersControllers";

const userRoutes = Router();

// GET
userRoutes.get('/login', loginSession);
userRoutes.get('/', getUser);
//PUT
userRoutes.put('/updateuser', putUpdatedUserInfo);

export default userRoutes;