import { ScheduledHandler } from "aws-lambda";
import "source-map-support/register";

export const generateWeeklySummary: ScheduledHandler = async (
  _event,
  _context
) => {
  console.log("schedule running...");
};
