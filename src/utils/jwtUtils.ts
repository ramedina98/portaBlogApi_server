import jwt from 'jsonwebtoken';
import { SERVER } from '../config/config';
import { IJwtPayload } from '../interfaces/IJwtPayload';

// define the secret key to sign the tokens...
const SECRET_KEY = SERVER.KEY;

// Function for generate a token...
function generateJwToken(payload: IJwtPayload): string {
    // token configuration...
    const options = {
        expiresIn: SERVER.TIME,
    }

    /// generate a token...
    const token = jwt.sign(payload, SECRET_KEY, options);

    return token;
}

export { generateJwToken };