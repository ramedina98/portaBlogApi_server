// here we have all the users controllers...
import { Request, Response } from "express";
import { getUserData, loginUser, EditUserInfo } from "../services/usersServices";

// login Controller...
const loginSession = async (req:Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const login = await loginUser(email, password);
        res.status(200).json({ message: 'Successful login', login });
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message })
    }
}

// this controller helps us to search a user...
const getUser = async (req: Request, res: Response) => {
    const { id_user } = req.body;

    try {
        const user = await getUserData(id_user);
        res.status(200).json({ message: 'User found', user })
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
}

// this controller helps us to update the data of a specific user...
const putUpdatedUserInfo = async (req: Request, res:Response) => {
    // this is an object with all the required data...
    const { id_user, userData } = req.body;

    try {
        const response = await EditUserInfo(id_user, userData);
        // response has to be (User updated successfully.): string
        res.status(200).json({ message: response });
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
}

export { loginSession, getUser, putUpdatedUserInfo};