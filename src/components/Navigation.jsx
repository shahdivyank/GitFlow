import Link from "next/link";
import React from "react";
import { SiGithubactions } from "react-icons/si";

const Navigation = () => {
  return (
    <div className="flex flex-col items-center justify-start px-4 py-8 gap-6 h-screen border-r-2">
      <SiGithubactions className="text-6xl" />
      <Link href="/workflows">Workflows</Link>
      <Link href="/create">Create Workflow</Link>
    </div>
  );
};

export default Navigation;
