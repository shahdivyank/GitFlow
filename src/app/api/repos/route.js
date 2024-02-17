import app from "@/lib/app";

export const GET = async () => {
  const output = [];

  for await (const { installation } of app.eachInstallation.iterator()) {
    for await (const { repository } of app.eachRepository.iterator({
      installationId: installation.id,
    })) {
      const {
        name,
        full_name,
        visibility,
        description,
        stargazers_count,
        archived,
        default_branch,
      } = repository;

      output.push({
        name,
        full_name,
        visibility,
        description,
        stargazers_count,
        archived,
        default_branch,
      });
    }
  }

  return Response.json(output);
};
