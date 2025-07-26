
import mysql from "mysql"

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER||"root",
    password:process.env.DB_PASSWORD||"root",
})