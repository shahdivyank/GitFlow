import app from "@/lib/app";
import { execSync } from "child_process";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  const { branch, repo, clone_url, code, workflow } = await req.json();
  const uuid = uuidv4().slice(0, 5);

  const name = workflow.split(" ").join("_");

  const { data: installation } = await app.octokit.request(
    `GET /repos/TreeHacks-Pipeline-Automation/${repo}/installation`
  );

  const octokit = await app.getInstallationOctokit(installation.id);

  execSync(`mkdir files && cd files && git clone ${clone_url}`);

  execSync(
    `cd files/${repo} mkdir -p .github/workflows && cd .github/workflows`
  );

  execSync(`cd files/${repo}/.github/workflows && touch ${name}.yaml`);

  fs.writeFileSync(`files/${repo}/.github/workflows/${name}.yaml`, code);

  execSync(`cd files/${repo}`);
  const output = execSync("ls").toString();
  console.log("AFTER CD AND BEFORE GIT", output);

  execSync(
    `git add . && git commit -m "Added ${name} to ${repo}" && git checkout -b ciui/${name}_${uuid} && git push origin ciui/${name}_${uuid}`
  );

  const wee = execSync("ls").toString();
  console.log("AFTER GIT", wee);

  // execSync(
  //   `cd files/${repo} && git add . && git commit -m "Added ${name} to ${repo}" && git checkout -b ciui/${name}_${uuid} && git push origin ciui/${name}_${uuid}`
  // );

  execSync(`rm -rf files/`);

  const { data } = await octokit.rest.pulls.create({
    title: `AUTOMATION: ${name} added into ${repo}`,
    body: `AUTOMATION WORKFLOW: ${name}`,
    owner: "TreeHacks-Pipeline-Automation",
    repo: repo,
    head: `ciui/${name}_${uuid}`,
    base: branch,
  });

  return Response.json({
    number: data.number,
    head: data.head.ref,
    url: data.html_url,
  });
};

export const DELETE = async (req) => {
  const number = req.nextUrl.searchParams.get("number");
  const workflow = req.nextUrl.searchParams.get("workflow");
  const repo = req.nextUrl.searchParams.get("repo");

  const { data: installation } = await app.octokit.request(
    `GET /repos/TreeHacks-Pipeline-Automation/${repo}/installation`
  );

  console.log(number, repo, workflow);

  const octokit = await app.getInstallationOctokit(installation.id);

  const { data } = await octokit.rest.pulls.checkIfMerged({
    owner: "TreeHacks-Pipeline-Automation",
    repo: repo,
    pull_number: number - 1,
  });

  console.log(data);

  return Response("ok");
};
