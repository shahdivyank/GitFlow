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
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import Protected from "../Protected";

const Create = () => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: " ",
    length: 3,
  });

  const formSchema = z.object({
    workflow_name: z.string().min(2).max(50),
    environment: z.string().min(2).max(50),
    type: z.string().min(2).max(50),
    tool: z.string().min(2).max(50),
    package: z.string().min(2).max(50),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflow_name: randomName,
    },
  });

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Protected>
      <div className="mx-8">
        <p className="text-3xl font-semibold my-3 text-center">
          Create a New Workflow
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="workflow_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how you can reference your workflow in the future.
                  </FormDescription>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="package"
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </Protected>
  );
};

export default Create;
