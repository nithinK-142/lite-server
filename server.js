import express from "express";
import { liteDB } from "./connect.js";
import { SQL_SELECT, SQL_INSERT, SQL_DELETE } from "./queries.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.status(200).send("AnimeList API"));

app.get("/api", (_req, res) => {
  let data = { animelist: [] };
  try {
    liteDB.all(SQL_SELECT, [], function (err, rows) {
      if (err) {
        throw err;
      }

      rows.forEach((row) => {
        data.animelist.push({
          id: row.anime_id,
          name: row.anime_name,
          description: row.anime_description,
        });
      });

      const content = JSON.stringify(data);
      return res.status(200).send(content);
    });
  } catch (err) {
    console.log("Error fetching anime list :", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api", (req, res) => {
  const { anime_name, anime_description, isfavorite } = req.body;
  try {
    liteDB.run(
      SQL_INSERT,
      [anime_name, anime_description, isfavorite],
      function (err) {
        if (err) throw err;
        console.log(this.lastID);
        return res.status(200).json({ message: "anime inserted" });
      }
    );
  } catch (err) {
    console.log("Error inserting anime :", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api", (req, res) => {
  const { id } = req.query;
  try {
    liteDB.run(SQL_DELETE, [id], function (err) {
      if (err) throw err;
      if (this.changes === 1) {
        return res.status(200).json({ message: "anime deleted" });
      } else {
        return res.status(200).json({ message: "anime not found" });
      }
    });
  } catch (err) {
    console.log("Error deleting anime :", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => console.log("Server is Up and Running..."));
