import { DataSource } from "typeorm";
import env from "./config/env";

export const AppDataSource = new DataSource({
    
    host: env.DATABASE.HOST,
    port: env.DATABASE.PORT,
    username: env.DATABASE.USER,
    password: env.DATABASE.PASS,
    database: env.DATABASE.NAME,
    
    synchronize: false,
    type: "postgres",
    logging: false

});