import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = `${process.env.MONGODB_URL}`;
const DB_NAME = "notes-app";

let db;

export async function connectToDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(DB_NAME);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export function getDB() {
  return db;
}
