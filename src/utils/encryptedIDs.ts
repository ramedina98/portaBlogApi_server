/**
 * This function create here helps us to encrypt any element that we want with bcrypt...
 */
import bcrypt from "bcrypt";
import { SERVER } from "../config/config";

const encryptedElemen = async (str: string): Promise<string> => {
    const saltRounds: number = SERVER.SET_ROUNDS;
    // generate the salt property using the saltRounds...
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptElement = await bcrypt.hash(str, salt);
    return encryptElement;
}

export { encryptedElemen };