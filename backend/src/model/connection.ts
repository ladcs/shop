import * as dotenv from 'dotenv'
import * as mysql from 'mysql2/promise';

dotenv.config();

const mysqlUser = process.env.MYSQL_USER ?? "root";
const mysqlPass = process.env.MYSQL_PASSWORD ?? "root";
const mysqlPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3306;

const connection = mysql.createPool({
  host: "localhost",
  user: mysqlUser,
  port: mysqlPort,
  password: mysqlPass,
  database: "market",
});

export default connection;