import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import dotenv from "dotenv";

// injecting our .env.local file's secrets
dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
