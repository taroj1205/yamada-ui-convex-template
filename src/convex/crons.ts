import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "generate chart data",
  { seconds: 1 },
  internal.functions.chartData.generateChartData,
  {}
);

export default crons;
