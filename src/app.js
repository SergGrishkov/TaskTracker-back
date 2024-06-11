import express from "express";
import morgan from "morgan";
import cors from "cors";
import 'dotenv/config';
import router from "./routes/index.js";
import './server.js';
import swaggerUi from "swagger-ui-express";
import fs from "fs/promises";

const app = express();
const swaggerDocument = JSON.parse(
  await fs.readFile(new URL("../swagger.json", import.meta.url))
);

const options = {
  explorer: true,
};

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use("/api", router);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;