"use client";
import { useEffect, useState } from "react";
import Protected from "../Protected";
import { api } from "@/lib/api";
import Repo from "./Repo";
import { IoReload } from "react-icons/io5";

const Repos = () => {
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    api({
      url: "/api/repos",
      method: "GET",
    }).then((repos) => setRepos(repos));
  }, []);

  return (
    <Protected title="GitFlow | Repos">
      {repos && (
        <div className="grid grid-cols-4 w-full h-fit gap-8 p-8">
          {repos.map((repo) => (
            <Repo {...repo} />
          ))}
        </div>
      )}

      {!repos && (
        <p className="flex flex-col items-center justify-center w-full text-4xl">
          Loading
          <IoReload className="mr-2 animate-spin text-3xl my-2" />
        </p>
      )}
    </Protected>
  );
};

export default Repos;
