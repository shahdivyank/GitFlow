import Link from "next/link";
import React from "react";
import { SiGithubactions } from "react-icons/si";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <div className="flex flex-col items-center justify-start px-4 py-8 gap-6 h-screen border-r-2">
      <SiGithubactions className="text-6xl" />
      <Link href="/create" className="whitespace-nowrap">
        <Button variant="ghost" className="text-xl">
          Create Workflow
        </Button>
      </Link>
      <Link href="/workflows">
        <Button variant="ghost" className="text-xl">
          Workflows
        </Button>
      </Link>
      <Link href="/repos">
        <Button variant="ghost" className="text-xl">
          Repos
        </Button>
      </Link>
    </div>
  );
};

export default Navigation;
