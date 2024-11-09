/**
 * @module Technologies
 *
 * This is the user Interfaces...
 */
interface IUser {
    id_user: string;
    name1?: string;
    name2?: string;
    surname?: string;
    phone?: string;
    email?: string;
    passwrd?: string;
    photo?: string;
}

interface IUserLogin {
    id_user: string;
    jwt: string;
}

export { IUser, IUserLogin }