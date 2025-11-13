import { Property } from "../models/property.model.ts";
import { Note } from "../models/note.model.ts";
import { Reminder } from "../models/reminder.model.ts";

export interface Agent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  properties: Property[];
  notes: Note[];
  reminders: Reminder[];
  isActive: boolean;
  created: Date;
  updated: Date;
}