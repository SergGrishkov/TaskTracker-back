import { connect } from "mongoose";

export async function connectDb() {
  try {
    await connect(process.env.DB_URI);
    console.log("Database connection successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
