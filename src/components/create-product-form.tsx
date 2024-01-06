"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.literal(7),
  description: z.string().min(10).max(500),
  picture: z.string(),
});

const RequiredIndicator = () => {
  return <span className="text-red-200">*</span>;
};

const CreateProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <RequiredIndicator />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Example: Smartphone Samsung Galaxy S20"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name of the product that will appear prominently in
                the store.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Price <RequiredIndicator />
              </FormLabel>
              <FormControl>
                <Input placeholder="Example: $225" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the product that will appear prominently in
                the store.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <RequiredIndicator />
              </FormLabel>
              <FormControl>
                <Textarea
                  className="resize resize-y max-h-64"
                  rows={4}
                  placeholder="Enter product description"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {
                  "Write a beautiful description to catch your customer's attention."
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input
                  placeholder="Example: https://avatars.githubusercontent.com/u/46607418?s=48&v=4"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This field is optional and only accepts the image url
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
