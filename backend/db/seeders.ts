import * as fs from 'fs';

import connection from "./connection";

const sql = fs.readFileSync("./database.sql", "utf8");

const executeQuery = async (query: string) => {
  try {
    await connection.query(query);
  } catch(error) {
    console.log(error);
  }
}

const getQueries = async () => {
  const queries = sql.split(";");
  queries.forEach((query) => {
    if(query.trim()) executeQuery(query);
  });
};

export default getQueries;