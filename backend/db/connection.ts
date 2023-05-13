import * as dotenv from 'dotenv'
import * as mysql from 'mysql2/promise';

dotenv.config()

const connection = await mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "market",
});

export default connection;