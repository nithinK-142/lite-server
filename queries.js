export const SQL_CREATE_TABLE = `CREATE TABLE IF NOT EXISTS animelist (
    anime_id INTEGER PRIMARY KEY,
    anime_name TEXT NOT NULL,
    anime_description TEXT NOT NULL,
    isfavorite INTEGER NOT NULL DEFAULT 0)`;

export const SQL_SELECT = "SELECT * FROM animelist";

export const SQL_INSERT =
  "INSERT INTO animelist(anime_name, anime_description, isfavorite) VALUES(?, ?, ?)";

export const SQL_DELETE = "DELETE FROM animelist WHERE anime_id=?";
