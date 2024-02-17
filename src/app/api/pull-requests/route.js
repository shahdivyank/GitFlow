import app from "@/lib/app";

export const GET = async () => {
  const { data: installation } = await app.octokit.request(
    `GET /repos/TreeHacks-Pipeline-Automation/testing-js/installation`
  );

  const octokit = await app.getInstallationOctokit(installation.id);

  await octokit.rest.issues.create({
    owner: "TreeHacks-Pipeline-Automation",
    repo: "testing-js",
    title: "pls pls pls pls pls work",
  });

  const response = await octokit.rest.apps.listReposAccessibleToInstallation();

  return Response.json(response);
};
