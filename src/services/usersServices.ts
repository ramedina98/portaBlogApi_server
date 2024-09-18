/**
 * @UserServices --> Here I have all the required services to handle the users controllers...
 * 1. Get all the data.
 * 2. Login.
 * 3. Update data.
 */
import { User } from "../models/mysql/usersModel";
import { IUser, IUserLogin } from "../interfaces/IUser";
import { IJwtPayload } from '../interfaces/IJwtPayload';
import { generateJwToken } from '../utils/jwtUtils';
import { loggingInfo } from "../utils/resumeModulesUtilF";
import bcrypt from 'bcrypt';
import logging from "../config/logging";

/**
 * @MethodGET -> This service helps me to login the users...
 * @param email
 * @param password
 *
 * If the email or password does not match, then a number is returned
 * indicating this...
 * 1 = Invalid email
 * 2 = Invalid password
 */
const loginUser = async (email:string, password:string): Promise<IUserLogin | number> => {
    try{
        const user: any = await User.findOne({ where: { email }});

        if(!user){
            logging.warning('::::::::::::::::::::');
            logging.error('Invalid email'); // user not found, email incorrect...
            logging.warning('::::::::::::::::::::');
            return 1;
        }

        // check if both are the same...
        const isPasswordValid = await bcrypt.compare(password, user.passwrd);

        if(!isPasswordValid){
            logging.warning('::::::::::::::::::::');
            logging.error('Invalid password'); // password not found, password incorrect...
            logging.warning('::::::::::::::::::::');
            return 2;
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

        loggingInfo(`${user.name1} successfully logged in`);

        // we return the object we the needed info...
        return response;

    } catch(error: any){
        logging.warning(':::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warning(':::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethodGET -> This service helps me to reach the data of a specific user...
 * @param id_user
 *
 * If the user was not found it returns a null to indicate this and in the controller
 * I send the message and the corresponding status...
 */
const getUserData = async (id_user: string): Promise<IUser | null> => {
    try {
        // search for the user...
        const user: any = await User.findOne({ where: { id_user }});

        if(!user){
            logging.warning(':::::::::::::::::');
            logging.error('User not found');
            logging.warning(':::::::::::::::::');
            return null;
        }

        loggingInfo('User found!');

        return user;
    } catch (error: any) {
        logging.warning('::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warning('::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethodPUT --> This service helps me to edit the register of a specific user...
 * @param id_user
 * @param data
 *
 * If no record corresponds to the id_user, it returns a null to indicate this...
 */
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
            logging.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            logging.error('No records were updated. User may not exist or no changes were made.');
            logging.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }

        loggingInfo('User updated successfully');

        return 'User updated successfully';

    } catch (error: any) {
        logging.warning('::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warning('::::::::::::::::::::::::::');
        throw error;
    }
}

export { loginUser, getUserData, EditUserInfo};