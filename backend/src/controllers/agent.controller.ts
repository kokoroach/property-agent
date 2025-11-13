import { Request, Response } from "express";
import { Agent } from "../models/agent.model.ts";


let agents: Agent[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "WonderLand",
    email: "alice@example.com",
    mobileNumber: "0948",
    properties: [],
    notes: [],
    reminders: [],
    isActive: true,
    created: new Date("2025-01-15T00:00:01"),
    updated: new Date("2025-01-15T00:00:01")
  },
  {
    id: 2, 
    firstName: "Bob", 
    lastName: "Builder", 
    email: "bob@example.com", 
    mobileNumber: "0978", 
    properties: [],
    notes: [],
    reminders: [],
    isActive: true,
    created: new Date( "2025-01-15T00:00:02"),
    updated: new Date("2025-01-15T00:00:02")
  },
  {
    id: 3,
    firstName: "Pedro",
    lastName: "Penduko",
    email: "pedro@example.com",
    mobileNumber: "0951",
    properties: [],
    notes: [],
    reminders: [],
    isActive: true,
    created: new Date("2025-01-15T00:00:03"),
    updated: new Date("2025-01-15T00:00:03")
  },
  {
    id: 4,
    firstName: "Maria",
    lastName: "Makiling",
    email: "maria@example.com",
    mobileNumber: "0952",
    properties: [],
    notes: [],
    reminders: [],
    isActive: false,
    created: new Date("2025-01-15T00:00:04"),
    updated: new Date("2025-01-15T00:00:04")
  },
];


const _getAgentByIdHandler = (id: number, res: Response): Agent | null => {
  const agent = agents.find(a => a.id === id);
  if (!agent) {
    res.status(404).json({ message: "Agent not found" });
    return null;
  }
  return agent;
};


export const getAgents = (req: Request, res: Response) => {
  const activeAgents = agents.filter(u => u.isActive);
  res.json(activeAgents);
};

export const getAgentById = (req: Request, res: Response) => {
  const agent = _getAgentByIdHandler(Number(req.params.id), res);
  if (!agent) return;

  res.json(agent)
};

const _createAgent = (req: Request, res: Response) => {
  const _now: Date = new Date(Date.now())
  // TODO: Do validation of fields?
  // TODO: Error-prone as assumes agents are sorted by id
  // TODO: Resolve, ensure to sort agent list (for in memory setup)
  const lastId = agents.length > 0 ? agents[agents.length - 1].id : 0;
  
  // TODO: handle default data such as properties, notes, etc.
  const newAgent: Agent = {
    id: lastId + 1,
    properties: [],
    notes: [],
    reminders: [],
    ...req.body,
    // Ensures to override data that could exist. Could be handled more
    // gracefully
    isActive: true,
    created: _now,
    updated: _now,
  };
  agents.push(newAgent);

  res.status(201).json(newAgent);
};

export const updateAgent = (req: Request, res: Response) => {
  const agent = _getAgentByIdHandler(Number(req.params.id), res);
  if (!agent) return

  // Do not include dates in the update
  const { created, updated, ...rest } = req.body;
  Object.assign(agent, rest, { updated: new Date() });
  res.json(agent);
};

export const upsertAgent = (req: Request, res: Response) => {
  const agent = agents.find(a => a.email === req.body.email);
  if (!agent) return _createAgent(req, res);

  // Include the ID number as it is required in the update
  req.body.id = agent.id
  return updateAgent(req, res)
};

export const removeAgentById   = (req: Request, res: Response) => {
  const agent = _getAgentByIdHandler(Number(req.params.id), res);
  if (!agent) return;
  
  agent.isActive = false;
  res.status(200).json({ message: "User has been deactivated." });
}
