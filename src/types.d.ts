/**
 * We define the enviroment variables here to let TS knows that they have to be define...
 */
declare namespace NodeJS{
    interface ProcessEnv{
        DB_NAME: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_PORT: string;
        MONGO_URI: string;
        PORT_TS_SERVER: string;
    }
}