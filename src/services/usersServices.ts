/**
 * Here we have all the required services for users
 * 1. Get all the data.
 * 2. Login.
 * 3. Update data.
 */
import { User } from "../models/mysql/usersModel";
import { IUser, IUserLogin } from "../interfaces/IUser";
import { IJwtPayload } from '../interfaces/IJwtPayload';
import { generateJwToken } from '../utils/jwtUtils';
import bcrypt from 'bcrypt';
import logging from "../config/logging";

// (GET) this service helps us to login the users (or not)...
const loginUser = async (email:string, password:string): Promise<IUserLogin | null> => {
    try{
        const user = await User.findOne({ where: { email }});

        if(!user){
            logging.error('Invalid email'); // user not found, email incorrect...
            return null;
        }

        // check if both are the same...
        const isPasswordValid = await bcrypt.compare(password, user.passwrd);

        if(!isPasswordValid){
            logging.error('Invalid password');
            throw new Error('Invalid password');
        }

        // generar un JWT para re enviar los datos...
        const payload: IJwtPayload = {
            userId: user.id_user,
            name: user.name1,
            phone: user.phone
        }

        const token: string = generateJwToken(payload);

        //create the object that we have to return...
        const response: IUserLogin = {
            id_user: user.id_user,
            jwt: token,
        }

        // we return the object we the needed info...
        return response;

    } catch(error: any){
        logging.error('Error: ' + error.message);
        throw error;
    }
}

// (GET) this service helps us to get the data of a user...
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

// (PUT) This service helps us to edit information...
// TODO: Verificar si necesita ser setida de un tipo en especifico la funcion...
const EditUserInfo = async (id_user: string, data: IUser): Promise<string | null> => {
    try {
        // search for the correct user and edit its info...
        const response: any = await User.update({
            name1: data.name1,
            name2: data.name2,
            surname: data.surname,
            phone: data.phone,
            email: data.email,
            passwrd: data.passwrd,
            photo: data.photo
        }, {
            where: { id_user }
        });

        if(response === 0){
            logging.error('No records were updated. User may not exist or no changes were made.');
            return null;
        }

        return 'User updated successfully';

    } catch (error: any) {
        logging.error('Error fetching de user data: ' + error.message);
        throw error;
    }
}

export { loginUser, getUserData, EditUserInfo};