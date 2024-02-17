import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaCode, FaTrashAlt } from "react-icons/fa";
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
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Workflow = ({
  _id,
  name,
  count = 10,
  description,
  environment,
  package_manager,
  tool,
  type,
}) => {
  const deleteWorkflow = useMutation(api.workflows.deleteWorkflow);

  const handleDelete = async () => {
    await deleteWorkflow({
      id: _id,
    });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {name}
          <div className="flex">
            {count} <FaCode className="mx-2" />
          </div>
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
