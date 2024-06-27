import sqlite3 from "sqlite3";
import { SQL_CREATE_TABLE } from "./queries.js";

const sql3 = sqlite3.verbose();

const liteDB = new sql3.Database(
  "./litedb.db",
  sqlite3.OPEN_READWRITE,
  connected
);

function connected(err) {
  if (err) {
    console.log("error connecting to db", err.message);
    return;
  }
  console.log("Created the DB or it already exists!");
}

liteDB.run(SQL_CREATE_TABLE, [], (err) => {
  if (err) {
    console.log("error creating animelist table ", err.message);
    return;
  }
  console.log("Table created.");
});

export { liteDB };
