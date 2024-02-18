"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Protected from "../Protected";
import { FaCopy, FaCheck } from "react-icons/fa";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CustomAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const Create = () => {
  const [copy, setCopy] = useState(false);
  const [data, setData] = useState({});

  const router = useRouter();

  const formSchema = z.object({
    workflow_name: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    environment: z.string().min(2).max(50),
    type: z.string().min(2).max(50),
    tool: z.string().min(2).max(50),
    package_manager: z.string().min(2).max(50),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflow_name: "",
    },
  });

  const createWorkflow = useMutation(api.workflows.create);

  const onSubmit = async ({
    workflow_name,
    description,
    environment,
    type,
    tool,
    package_manager,
  }) => {
    const code = await CustomAPI({
      url: "/api/togetherai",
      method: "POST",
    });

    setData({
      workflow_name,
      description,
      environment,
      type,
      tool,
      package_manager,
      code,
    });
  };

  const onCreate = async () => {
    await createWorkflow({
      ...data,
    });
    toast({
      title: "Created Workflow!",
      description: `${data.workflow_name} is Available for Use`,
    });
    router.push("/workflows");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.code);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  return (
    <Protected>
      <div className="mx-8">
        <p className="text-3xl font-semibold my-1 text-center">
          Create a New Workflow
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="workflow_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Workflow Name" />
                  </FormControl>
                  <FormDescription>
                    You cannot change this name later on!
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Check formatting" />
                  </FormControl>
                  <FormDescription>What does this workflow do?</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="environment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Environment</FormLabel>
                  <FormControl>
                    <Input placeholder="Node.js v20.10.0" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the environment in which your application runs.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="package_manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Manager</FormLabel>
                  <FormControl>
                    <Input placeholder="Bun" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the package manager utilized (ie. Bun, Yarn, NPM,
                    Poetry)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Formatting" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the desired type of CI you would like to include
                    (ie. linting, formatting, testing)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tool</FormLabel>
                  <FormControl>
                    <Input placeholder="Prettier" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the desired tool to run the given type of continous
                    integration.
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" variant="secondary">
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-1/2 m-8 flex flex-col items-end justify-end">
        <div className="w-full h-[90%] bg-slate-800 rounded p-8">
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
              {form.getValues().workflow_name.split(" ").join("_")}.yaml
            </p>
            {data.code === "" ? "No Code Generated Just Yet!" : data.code}
          </code>
        </div>
        <Button type="submit" className="my-2" onClick={onCreate}>
          Create Workflow
        </Button>
      </div>
    </Protected>
  );
};

export default Create;
