"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { Link } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { IoMdShare } from "react-icons/io";
import { toast } from "../ui/use-toast";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

const Share = ({ params }) => {
  const [copy, setCopy] = useState(false);

  const { id } = params;
  const workflow = useQuery(api.workflows.getWorkflow, {
    id,
  });

  if (!workflow) {
    return <>hello</>;
  }

  const { name, description, environment, package_manager, type, tool, code } =
    workflow;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

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
      <div className="w-1/2 flex items-center">
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
    </div>
  );
};

export default Share;
