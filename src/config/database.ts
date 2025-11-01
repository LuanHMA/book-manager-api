import mysql2 from "mysql2/promise"
import { env } from "../env/index.js";

export const db = mysql2.createPool({
    host: env.HOST,
    user: env.USER,
    password: env.PASSWORD,
    database: env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
