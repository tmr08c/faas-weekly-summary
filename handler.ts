import { ScheduledHandler } from "aws-lambda";
import "source-map-support/register";
import { fetchRecentlyClosedPullRequests } from "weekly-summary-typescript";

export const generateWeeklySummary: ScheduledHandler = async (
  _event,
  _context
) => {
  console.log("Running schedule for generating Weekly Summary");

  console.log("Requesting Pull Requests");
  const recentlyClosedPullRequests = await fetchRecentlyClosedPullRequests({
    organization: "roirevolution"
  });

  console.log("Received Pull Requests. Generating e-mail.");

  let emailBody = "";

  Object.entries(recentlyClosedPullRequests).forEach(
    ([repoName, pullRequests]) => {
      emailBody = emailBody.concat(`# ${repoName}\n\n`);
      pullRequests.forEach(pullRequest => {
        emailBody = emailBody.concat(
          `* ${pullRequest.title} (${pullRequest.url})\n`
        );
      });
      emailBody = emailBody.concat("\n");
    }
  );

  console.log("Generated email body:");
  console.log(emailBody);

  console.log("Figure out how to send the email...");
};
