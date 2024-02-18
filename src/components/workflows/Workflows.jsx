"use client";
import Protected from "../Protected";
import Workflow from "./Workflow";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoReload } from "react-icons/io5";

const Workflows = () => {
  const workflows = useQuery(api.workflows.get);

  return (
    <Protected title="GitFlow | Workflows">
      {!workflows && (
        <p className="flex flex-col items-center justify-center w-full text-4xl">
          Loading
          <IoReload className="mr-2 animate-spin text-3xl my-2" />
        </p>
      )}

      {workflows && (
        <>
          {workflows.length === 0 && (
            <div className="flex justify-center w-full items-center font-semibold text-xl flex-col">
              No Workflows to Display
              <Link href="/create">
                <Button className="my-2">Create a Workflow</Button>
              </Link>
            </div>
          )}

          {workflows.length > 0 && (
            <div className="grid grid-cols-4 w-full h-fit gap-8 p-8">
              {workflows.map((workflow) => (
                <Workflow {...workflow} />
              ))}
            </div>
          )}
        </>
      )}
    </Protected>
  );
};

export default Workflows;
