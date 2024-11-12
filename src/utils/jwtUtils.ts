/**
 * In this file we can find util functions to handle some jwt process like: create them and
 * extract information  from them...
 */
import { SERVER } from '../config/config';
import { IJwtPayload, JwtFields } from '../interfaces/IJwtPayload';
import jwt from 'jsonwebtoken';
import logging from '../config/logging';

// This function helps me to create a JWT...
const generateJwToken = (payload: IJwtPayload): string => {
    return jwt.sign(
        { payload },
        SERVER.KEY,
        { expiresIn: SERVER.TIME }
    );
}

// This other function helps me to extract information from the JWT generated...
const extractJwtInfo = (token: string, field: JwtFields): string | null => {
    try {
        // verify and decodify the token...
        const decoded: any = jwt.verify(token, SERVER.KEY);

        // return the required data...
        return decoded[field] || null;
    } catch (error: any) {
        logging.error(`Error decoding token: ${error.message}`);
        return null;
    }
}

export { generateJwToken, extractJwtInfo };