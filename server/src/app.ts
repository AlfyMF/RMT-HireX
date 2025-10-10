import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { setupSwagger } from "./docs/swagger";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
setupSwagger(app);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", environment: config.env });
});

// API Routes
app.use("/api", routes);

// Error handling
app.use(errorHandler);

export default app;
