"use client";
import Protected from "../Protected";
import Workflow from "./Workflow";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Workflows = () => {
  const workflows = useQuery(api.workflows.get);

  return (
    <Protected>
      {workflows && (
        <div className="grid grid-cols-4 w-full h-fit gap-8 p-8">
          {workflows.map((workflow) => (
            <Workflow {...workflow} />
          ))}
        </div>
      )}

      {!workflows && (
        <p className="flex items-center justify-center w-full text-4xl">
          Loading...
        </p>
      )}
    </Protected>
  );
};

export default Workflows;
