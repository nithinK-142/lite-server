import express from "express";
import { liteDB } from "./connect.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  return res.status(200).send("AnimeList API");
});

app.get("/api", (_req, res) => {
  res.set("content-type", "application/json");

  const sql = "SELECT * FROM animelist";
  let data = { animelist: [] };

  try {
    liteDB.all(sql, [], function (err, rows) {
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
  res.set("content-type", "application/json");

  const sql =
    "INSERT INTO animelist(anime_name, anime_description, isfavorite) VALUES(?, ?, ?)";

  try {
    const { anime_name, anime_description, isfavorite } = req.body;

    liteDB.run(
      sql,
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

app.listen(8000, () => {
  console.log("Server is Up and Running...");
});
