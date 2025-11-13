import { Router } from "express";
import { getAgents, getAgentById, createAgent, updateAgent, removeAgentById} from "../controllers/agent.controller.ts";


const router = Router();

const agentsAPI = "/api/v1/agents"

// Agents route
router.get(`${agentsAPI}/`, getAgents);
router.get(`${agentsAPI}/:id`, getAgentById);
router.post(`${agentsAPI}/`, createAgent);
router.patch(`${agentsAPI}/:id`, updateAgent);
router.delete(`${agentsAPI}/:id`, removeAgentById)

router.get("/api/v1/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default router;