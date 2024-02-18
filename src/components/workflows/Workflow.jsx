import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaCode, FaTrashAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const Workflow = ({
  _id,
  name,
  description,
  environment,
  package_manager,
  tool,
  type,
}) => {
  const deleteWorkflow = useMutation(api.workflows.deleteWorkflow);
  const installs = useQuery(api.installations.getCounts, {
    name,
  });

  const handleDelete = async () => {
    await deleteWorkflow({
      id: _id,
    });
    toast({
      title: "Deleted",
      variant: "destructive",
      description: `${name} is permanently deleted.`,
    });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const handleSelect = () => {
    toast({
      title: "Copied to Clipboard",
      description: `${name} is copied and now shareable!`,
    });
    navigator.clipboard.writeText(`localhost:3000/share/${_id}`);
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <Link
            target="_blank"
            href={`/manage/${_id}`}
            className="hover:underline"
          >
            {name}
          </Link>
          <IoMdShare
            className="hover:cursor-pointer hover:opacity-75"
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
      <CardFooter className="flex justify-between">
        <CardDescription className="flex items-center">
          Used by{" "}
          <span className="font-semibold mx-2 text-lg">{installs?.length}</span>
          {installs?.length === 1 ? "repository" : "repositories"}
        </CardDescription>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <FaTrashAlt className="hover:cursor-pointer mx-2 text-xl hover:text-red-500" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                workflow.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>

              <Button variant="destructive" onClick={handleDelete}>
                Delete Workflow
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default Workflow;
