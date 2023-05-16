const Importer = require('mysql-import');
import * as dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';

dotenv.config();

const mysqlUser = process.env.MYSQL_USER ?? 'root';
const mysqlPass = process.env.MYSQL_PASSWORD ?? '123456';
const mysqlPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3306;
const host = 'localhost';

const connectionConfig = {
  host: host,
  user: mysqlUser,
  port: mysqlPort,
  password: mysqlPass,
  database: 'market',
};

const seeders = async (): Promise<void> => {
  try {
    const connection = await createConnection(connectionConfig);
    const importer = new Importer(connectionConfig);
    await importer.import("market.sql");

    importer.disconnect();
    connection.end();
  } catch (error) {
    console.error('Error importing database:', error);
  }
};
export default seeders;