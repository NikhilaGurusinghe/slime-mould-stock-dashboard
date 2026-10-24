import "server-only";

import { drizzle } from "drizzle-orm/libsql";

const dbLocation: string | undefined = process.env.DB_FILE_NAME;
if (!dbLocation) throw new Error("DB_FILE_NAME is not set");

const db = drizzle(dbLocation);

export default db;
