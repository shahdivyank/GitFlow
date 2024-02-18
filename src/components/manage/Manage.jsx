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
import { useState } from "react";

const Share = ({ params }) => {
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
      <div className="w-1/2 flex items-center justify-center h-screen">
        <Card className="flex flex-col justify-between w-fit">
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
      </div>
    </div>
  );
};

export default Share;
