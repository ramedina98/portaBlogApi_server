// here we have all the users controllers...
/**
 * @UserControllers --> Here I have all the users controllers needed to handle all the endpoints...
 */
import { Request, Response } from "express";
import { IUser, IUserLogin } from "../interfaces/IUser";
import { getUserData, loginUser, EditUserInfo } from "../services/usersServices";

/**
 * @LoginSessionController --> To log in
 * 1 = invalid email
 * 2 = invaild password
 */
const loginSession = async (req:Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const login: IUserLogin | number = await loginUser(email, password);

        // Here is the correct answer...
        if(typeof login === 'number'){
            const message = login === 1 ? 'Invalid email' : login === 2 ? 'Invalid password' : 'Unknow error';
            res.status(404).json({ message });
            return;
        }

        res.status(200).json({ message: 'Successful login', login });
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message })
    }
}

/**
 * @GetUserController --> This controller helps to search a specific user...
 * If nothing was found the service returns a null...
 */
const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const user: IUser | null = await getUserData(id);

        if(user === null){
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User successfully found', user })
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
}

/**
 *  @UpdateUserInfoController
 * This controller helps me to update the data of a specific user
 */
const putUpdatedUserInfo = async (req: Request, res:Response): Promise<void> => {
    try {
        const { id_user, userData } = req.body;

        const response: string | null = await EditUserInfo(id_user, userData);

        if(response === null){
            res.status(404).json({ message: 'Non-existent user' });
        }

        res.status(200).json({ message: response });
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
}

export { loginSession, getUser, putUpdatedUserInfo};