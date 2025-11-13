import { Request, Response } from "express";
import { User } from "../models/agent.model.ts";

let users: User[] = [
  { id: 1, firstName: "Alice", lastName: "WonderLand", email: "alice@example.com", mobileNumber: "0948" },
  { id: 2, firstName: "Bob", "lastName": "Builder", email: "bob@example.com", mobileNumber: "0978" },
];


export const getAgents = (req: Request, res: Response) => {
  res.json(users);
};
