import express from "express";
import "dotenv/config";
import { AnimelistRouter } from "./routes.js";

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.use(AnimelistRouter);

app.listen(port, () => console.log("Server is Up and Running at", port));
