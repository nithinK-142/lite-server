import { Router } from "express";
import { liteDB } from "./connect.js";
import { SQL_SELECT, SQL_INSERT, SQL_DELETE } from "./queries.js";
import { errorHandler, sendResponse } from "./utils.js";

const router = Router();

router.get("/", (_req, res) =>
  sendResponse(res, 200, { message: "AnimeList API" })
);

router.get("/api", (_req, res) => {
  let data = { animelist: [] };
  try {
    liteDB.all(SQL_SELECT, [], function (err, rows) {
      if (err) throw err;

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
    errorHandler(res, err, "fetching anime list");
  }
});

router.post("/api", (req, res) => {
  const { anime_name, anime_description, isfavorite } = req.body;
  try {
    liteDB.run(
      SQL_INSERT,
      [anime_name, anime_description, isfavorite],
      function (err) {
        if (err) throw err;

        sendResponse(res, 200, { message: "Anime inserted", id: this.lastID });
      }
    );
  } catch (err) {
    errorHandler(res, err, "inserting anime");
  }
});

router.delete("/api", (req, res) => {
  const { id } = req.query;
  try {
    liteDB.run(SQL_DELETE, [id], function (err) {
      if (err) throw err;

      const message = this.changes === 1 ? "Anime deleted" : "Anime not found";
      sendResponse(res, 200, { message });
    });
  } catch (err) {
    errorHandler(res, err, "deleting anime");
  }
});

export { router as AnimelistRouter };
