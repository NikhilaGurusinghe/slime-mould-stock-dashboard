import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const stateHistoryTable = sqliteTable("state_history_table", {
    timestampMS: integer().primaryKey(),
    state: text().notNull(),
    decision: text(), // can be null
    imagePath: text(), // also can be null
});