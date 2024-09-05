/**
 * Here we have all the required services for users
 * 1. Get all the data.
 * 2. Login.
 * 3. Update data.
 */
import User from "../models/mysql/usersModel";
import logging from "../config/logging";
import IUser from "../interfaces/IUser";

// this service helps us to get the data of a user...
const getUserData = async (id_user: string): Promise<IUser | null> => {
    try {
        // search for the user...
        const user = await User.findOne({ where: { id_user }});

        if(!user){
            logging.error('Invalid credential');
            return null;
        }

        return user;
    } catch (error: any) {
        logging.error('Error fetching de user data: ' + error.message);
        throw error;
    }
}

export { getUserData };