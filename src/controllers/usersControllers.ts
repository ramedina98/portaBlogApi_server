// here we have all the users controllers...
import { Request, Response } from "express";
import { getUserData } from "../services/usersServices";

const getUser = async (req: Request, res: Response) => {
    const { id_user } = req.body;

    try {
        const user = await getUserData(id_user);
        res.status(200).json({message: 'User found', user})
    } catch (error: any) {
        res.status(401).json({message: error.message});
    }
}

export { getUser };