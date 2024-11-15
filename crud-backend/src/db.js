import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// This is how we connect a "neon postgres database" using javascript.

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

export { client, connectDB };
