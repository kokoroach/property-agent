import { Router } from "express";
import { getAgents } from "../controllers/agent.controller.ts";


const router = Router();

router.get("/api/v1/agents/", getAgents);
router.get("/api/v1/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default router;