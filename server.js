import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  return res.status(200).send("AnimeList API");
});

app.listen(8000, () => {
  console.log("Server is Up and Running...");
});
