import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";
import { chartData } from "./tables/chartData";
import { counter } from "./tables/counter";
import { users } from "./tables/users";

export default defineSchema({
  ...authTables,
  users,
  counter,
  chartData,
});
