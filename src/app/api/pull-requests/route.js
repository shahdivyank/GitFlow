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

  execSync(
    `cd files/${repo} && git add . && git commit -m "Added ${name} to ${repo}" && git checkout -b gitflow/${name}_${uuid} && git push origin gitflow/${name}_${uuid}`
  );

  execSync(`rm -rf files/`);

  const { data } = await octokit.rest.pulls.create({
    title: `AUTOMATION: ${name} ADDED`,
    body: `AUTOMATION WORKFLOW: ${name} is being added into this repository.`,
    owner: "TreeHacks-Pipeline-Automation",
    repo: repo,
    head: `gitflow/${name}_${uuid}`,
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
  const url = req.nextUrl.searchParams.get("url");
  const branch = req.nextUrl.searchParams.get("branch");
  const uuid = uuidv4().slice(0, 5);

  const { data: installation } = await app.octokit.request(
    `GET /repos/TreeHacks-Pipeline-Automation/${repo}/installation`
  );

  const octokit = await app.getInstallationOctokit(installation.id);

  try {
    await octokit.rest.pulls.checkIfMerged({
      owner: "TreeHacks-Pipeline-Automation",
      repo: repo,
      pull_number: number,
    });

    const clone_url = url.substring(0, url.indexOf("/pull"));

    console.log("WHERE AM I", clone_url, url);

    execSync(`mkdir files && cd files && git clone ${clone_url}`);

    execSync(`cd files/${repo} && cd .github/workflows`);

    execSync(`cd files/${repo}/.github/workflows && rm ${workflow}.yaml`);

    execSync(
      `cd files/${repo} && git add . && git commit -m "Remove ${workflow}" && git checkout -b gitflow/${workflow}_${uuid} && git push origin gitflow/${workflow}_${uuid}`
    );

    execSync(`rm -rf files/`);

    await octokit.rest.pulls.create({
      title: `AUTOMATION: ${workflow} REMOVED`,
      body: `AUTOMATION WORKFLOW: ${workflow} is being removed from this repository.`,
      owner: "TreeHacks-Pipeline-Automation",
      repo: repo,
      head: `gitflow/${workflow}_${uuid}`,
      base: branch,
    });

    return Response.json(true);
  } catch (err) {
    octokit.rest.pulls.update({
      owner: "TreeHacks-Pipeline-Automation",
      repo: repo,
      pull_number: number,
      state: "closed",
      body: `AUTOMATION WORKFLOW: ${workflow} is being closed due to a workflow deletion from GitFlow.`,
    });

    return Response.json(false);
  }
};
