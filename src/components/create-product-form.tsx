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
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import RequiredFieldIndicator from "./required-field-indicator";
import { productSchema } from "@/lib/zodSchemas";
import { enviroment } from "@/server/enviroment";

const CreateProductForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const { name, price, description, image } = values;

    try {
      const response = await fetch(`${enviroment.apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          description,
          image,
        }),
      });

      if (response && response.ok) {
        toast({
          description: "Product created with succefully.",
          duration: 2900,
        });

        setTimeout(() => {
          router.push("/admin/products");
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Error creating product, please contact support.",
        description: String(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <RequiredFieldIndicator />
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
                Price $ <RequiredFieldIndicator />
              </FormLabel>
              <FormControl>
                <Input placeholder="Example: 199.99" {...field} />
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
                Description <RequiredFieldIndicator />
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
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
