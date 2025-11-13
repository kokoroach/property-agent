import cors from "cors";
import express, { Application, Request, Response } from "express";
import routes from "./api/routes.ts"

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// TODO: Update to a more verbose and restrictive CORS handler
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use(routes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to the Node.js TypeScript REST API!");
});

// Start server 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});