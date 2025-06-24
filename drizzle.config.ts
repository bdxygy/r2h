import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
