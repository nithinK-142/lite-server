import sqlite3 from "sqlite3";

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

const sql = `CREATE TABLE IF NOT EXISTS animelist (
    anime_id INTEGER PRIMARY KEY,
    anime_name TEXT NOT NULL,
    anime_description TEXT NOT NULL,
    isfavorite BOOLEAN NOT NULL DEFAULT FALSE)`;

liteDB.run(sql, [], (err) => {
  if (err) {
    console.log("error creating animelist table ", err.message);
    return;
  }
  console.log("Table created.");
});

export { liteDB };
