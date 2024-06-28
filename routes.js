import { Router } from "express";
import { db } from "./connect.js";
import { SQL_SELECT, SQL_INSERT, SQL_DELETE } from "./queries.js";
import { errorHandler, sendResponse } from "./utils.js";

const router = Router();

router.get("/", (_req, res) =>
  sendResponse(res, 200, { message: "AnimeList API" })
);

router.get("/api", async (_req, res) => {
  try {
    const { rows } = await db.execute(SQL_SELECT);
    const animelist = rows.map((row) => ({
      id: row.anime_id,
      name: row.anime_name,
      description: row.anime_description,
    }));
    sendResponse(res, 200, { animelist });
  } catch (err) {
    errorHandler(res, err, "fetching anime list");
  }
});

router.post("/api", async (req, res) => {
  const { anime_name, anime_description, isfavorite } = req.body;
  const isfavoriteInt = isfavorite ? 1 : 0;
  try {
    const { lastInsertRowid } = await db.execute({
      sql: SQL_INSERT,
      args: [anime_name, anime_description, isfavoriteInt],
    });

    const id = lastInsertRowid ? parseInt(lastInsertRowid.toString()) : null;
    sendResponse(res, 200, { message: "Anime inserted", id });
  } catch (err) {
    errorHandler(res, err, "inserting anime");
  }
});

router.delete("/api", async (req, res) => {
  const { id } = req.query;
  try {
    const { rowsAffected } = await db.execute({
      sql: SQL_DELETE,
      args: [id],
    });
    const message = rowsAffected === 1 ? "Anime deleted" : "Anime not found";
    sendResponse(res, 200, { message });
  } catch (err) {
    errorHandler(res, err, "deleting anime");
  }
});

export { router as AnimelistRouter };
