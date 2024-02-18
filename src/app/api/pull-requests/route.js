import app from "@/lib/app";
import { exec, execSync } from "child_process";
import fs from "fs";

export const GET = async () => {
  const filename = "random words are cool".split(" ").join("_");
  const branch = "main";

  const { data: installation } = await app.octokit.request(
    `GET /repos/TreeHacks-Pipeline-Automation/testing-js/installation`
  );

  const octokit = await app.getInstallationOctokit(installation.id);

  execSync(
    `mkdir files && cd files && git clone https://github.com/TreeHacks-Pipeline-Automation/testing-js.git`
  );

  execSync(
    `cd files/testing-js && mkdir .github && cd .github && mkdir workflows && cd workflows`
  );

  execSync(`cd files/testing-js/.github/workflows && touch ${filename}.yaml`);

  fs.writeFileSync(
    `files/testing-js/.github/workflows/${filename}.yaml`,
    "this is testing that everything is working properly"
  );

  execSync(
    `cd files/testing-js && git add . && git commit -m "added new workflow" && git checkout -b ciui/new_workflow && git push origin ciui/new_workflow`
  );

  execSync(`rm -rf files/`);

  await octokit.rest.pulls.create({
    title: "New workflow added by uici",
    body: "This is a newly generated workflow to help with formatting using Prettier",
    owner: "TreeHacks-Pipeline-Automation",
    repo: "testing-js",
    head: "ciui/new_workflow",
    base: "main",
  });

  return Response.json("hello world");
};
