import mysql2 from "mysql2"

const poolCon = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'lab1',
    database: 'gastos'
}).promise()

export default poolCon