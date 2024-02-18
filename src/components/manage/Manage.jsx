"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { IoMdShare } from "react-icons/io";
import { toast } from "../ui/use-toast";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { CustomAPI } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Tile from "./Tile";
import { FaCheck, FaCopy } from "react-icons/fa";

const Manage = ({ params }) => {
  const [repos, setRepos] = useState(null);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    CustomAPI({
      url: "/api/repos",
      method: "GET",
    }).then((repos) => setRepos(repos));
  }, []);

  const { id } = params;
  const workflow = useQuery(api.workflows.getWorkflow, {
    id,
  });

  if (!workflow) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <p className="text-3xl font-semibold">Invalid Workflow ID</p>
        <p className="text-slate-500 text-xl my-2">Invalid ID: {id}</p>
        <Link href="/create">
          <Button>Create New Workflow</Button>
        </Link>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  const { name, description, environment, package_manager, type, tool, code } =
    workflow;

  const handleSelect = () => {
    toast({
      title: "Copied to Clipboard",
      description: `${name} is copied and now shareable!`,
    });
    navigator.clipboard.writeText(`localhost:3000/share/${id}`);
  };

  return (
    <div className="flex p-8">
      <div className="w-1/2 flex flex-col gap-4 items-start justify-start h-screen">
        <Card className="flex flex-col justify-between w-fit border-0">
          <CardHeader>
            <CardTitle className="flex justify-between">
              {name}
              <IoMdShare
                className="hover:cursor-pointer hover:opacity-75 mx-2"
                onClick={handleSelect}
              />
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <div>
              <Badge variant="outline">{environment}</Badge>
              <Badge variant="outline">{package_manager}</Badge>
              <Badge variant="outline">{type}</Badge>
              <Badge variant="outline">{tool}</Badge>
            </div>
          </CardFooter>
        </Card>
        <div className="w-full bg-slate-800 rounded p-8">
          <div className="w-full flex justify-end text-xl hover:cursor-pointer hover:opacity-50">
            {copy ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaCopy onClick={handleCopy} />
            )}
          </div>

          <code className="whitespace-pre-wrap">
            <p className="text-slate-500">
              .github/workflows/
              {name.split(" ").join("_")}.yaml
            </p>
            {code}
          </code>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 p-8">
        {repos &&
          repos.map((repo, index) => (
            <Tile repo={repo} name={name} code={code} key={index} />
          ))}
        {!repos && (
          <p className="flex items-center justify-center w-full text-4xl">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default Manage;
