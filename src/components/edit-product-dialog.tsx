"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import RequiredFieldIndicator from "./required-field-indicator";
import { productSchema } from "@/lib/zodSchemas";
import { enviroment } from "@/server/enviroment";

interface EditProductDialogProps {
  product: Product;
}

const EditProductDialog = ({ product }: EditProductDialogProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const { name, price, description, image } = values;

    try {
      const response = await fetch(
        `${enviroment.apiUrl}/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price,
            description,
            image,
          }),
        }
      );

      if (response && response.ok) {
        toast({
          description: "Product updated with succefully.",
          duration: 2900,
        });

        setTimeout(() => {
          window.location.href = window.location.href;
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Error editing product, please contact support.",
        description: String(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 w-8 p-0">
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {"Make changes to your procuct here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
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
                      required={false}
                      placeholder="Example: https://avatars.githubusercontent.com/u/46607418?s=48&v=4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={!form.formState.isDirty}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
