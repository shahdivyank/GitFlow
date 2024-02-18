"use client";
import Link from "next/link";
import React from "react";
import { SiGithubactions } from "react-icons/si";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import mascot from "../../public/mascot.png";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center justify-start px-1 py-8 h-screen border-r-2">
      <Link href="/" className="flex flex-col items-center justify-center">
        {/* <SiGithubactions className="text-6xl" /> */}
        <Image src={mascot} className="w-32" />
        <p className="text-3xl text-center my-4">GitFlow</p>
      </Link>

      <div className="flex flex-col items-center gap-3 my-16">
        <Link href="/create" className="whitespace-nowrap">
          <Button
            variant={pathname.includes("create") ? "" : "ghost"}
            className="text-lg"
          >
            Create Workflow
          </Button>
        </Link>
        <Link href="/workflows">
          <Button
            variant={pathname.includes("workflows") ? "" : "ghost"}
            className="text-lg"
          >
            Workflows
          </Button>
        </Link>
        <Link href="/repos">
          <Button
            variant={pathname.includes("repos") ? "" : "ghost"}
            className="text-lg"
          >
            Repos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
