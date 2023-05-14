const Importer = require('mysql-import');
import * as dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';

dotenv.config();

const mysqlUser = process.env.MYSQL_USER ?? 'root';
const mysqlPass = process.env.MYSQL_PASSWORD ?? 'root';
const mysqlPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3306;
const pathSql = process.env.PATHSQL ?? "./market.sql";

const connectionConfig = {
  host: 'localhost',
  user: mysqlUser,
  port: mysqlPort,
  password: mysqlPass,
  database: 'market',
};

const seeders = async (): Promise<void> => {
  try {
    const connection = await createConnection(connectionConfig);
    const importer = new Importer(connectionConfig);
    console.log(process.env.PATHSQL);
    await importer.import(pathSql);

    importer.disconnect();
    connection.end();
  } catch (error) {
    console.error('Error importing database:', error);
  }
};
export default seeders;