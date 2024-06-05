import { connectDb } from "./db/dbServer.js";
import app from "./app.js";

const { PORT } = process.env;

async function startServer() {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
}

startServer();
