import { createClient } from "@libsql/client";
import { SQL_CREATE_TABLE } from "./queries.js";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Function to create the table if it doesn't exist
async function createTableIfNotExists() {
  try {
    await client.execute(SQL_CREATE_TABLE);
    console.log("Table 'animelist' is ready");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

createTableIfNotExists();

export const db = client;
