import env from "dotenv";

env.config();
const e = process.env;

export default {
    
    DATABASE: {
        HOST: e.DB_HOST,
        USER: e.DB_USER,
        PASS: e.DB_PASS,
        NAME: e.DB_NAME,
        PORT: Number(e.DB_PORT)
    }
};