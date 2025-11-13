import { Tenant } from "../models/tenant.model.ts";

export interface Property {
  id: number;
  address: string;
  type: string;
  rent_amount: number;
  tenants: Tenant;
}
