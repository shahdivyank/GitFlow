"use client";
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
import { ToastAction } from "@/components/ui/toast";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CustomAPI } from "@/lib/api";
import { IoReload } from "react-icons/io5";
import { MdLock, MdOutlinePublic } from "react-icons/md";
import { toast } from "../ui/use-toast";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

const Tile = ({ repo, name, code }) => {
  const workflows = useQuery(api.installations.getInstallations, {
    repo: repo.name,
    workflow: name,
  });

  const install = useMutation(api.installations.install);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInstall = async (repo, default_branch, clone_url, code, name) => {
    setLoading(true);
    const { number, head, url } = await CustomAPI({
      url: "/api/pull-requests",
      method: "POST",
      body: {
        repo,
        branch: default_branch,
        clone_url,
        code,
        workflow: name,
      },
    });

    await install({
      number,
      head,
      url,
      repo,
      workflow: name,
    });

    toast({
      title: "Successfully Installed Workflow",
      description: `Please visit the created PR to merge`,
      action: (
        <ToastAction altText="Visit URL">
          <Link href={url} target="_blank">
            Visit PR
          </Link>
        </ToastAction>
      ),
    });

    setLoading(false);
    setOpen(false);
  };

  const icons = {
    public: <MdOutlinePublic className="mx-2" />,
    private: <MdLock />,
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {repo.name} {icons[repo.visibility]}
        </CardTitle>
        <CardDescription>{repo.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger disabled={repo.visibility === "private" || workflows}>
            <Button disabled={repo.visibility === "private" || workflows}>
              {repo.visibility === "private" && "Must be Public Repo"}
              {workflows && "Already Installed"}
              {repo.visibility === "public" && !workflows && "Install Workflow"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Install <code className="text-lg font-semibold">{name}</code>{" "}
                into <code className="text-lg font-semibold">{repo.name}</code>
              </DialogTitle>
              <DialogDescription>
                This action will create a pull request to the{" "}
                <code className="text-lg font-semibold">
                  {repo.default_branch}
                </code>{" "}
                branch.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button
                disabled={loading || repo.visibility === "private"}
                onClick={() =>
                  handleInstall(
                    repo.name,
                    repo.default_branch,
                    repo.clone_url,
                    code,
                    name
                  )
                }
              >
                {loading && (
                  <>
                    <IoReload className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                )}
                {!loading && !workflows && "Install Workflow"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default Tile;
