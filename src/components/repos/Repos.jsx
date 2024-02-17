"use client";
import { useEffect, useState } from "react";
import Protected from "../Protected";
import { api } from "@/lib/api";
import Repo from "./Repo";

const Repos = () => {
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    api({
      url: "/api/repos",
      method: "GET",
    }).then((repos) => setRepos(repos));
  }, []);

  return (
    <Protected>
      {repos && (
        <div className="grid grid-cols-4 w-full h-fit gap-8 p-8">
          {repos.map((repo) => (
            <Repo {...repo} />
          ))}
        </div>
      )}

      {!repos && (
        <p className="flex items-center justify-center w-full text-4xl">
          Loading...
        </p>
      )}
    </Protected>
  );
};

export default Repos;
