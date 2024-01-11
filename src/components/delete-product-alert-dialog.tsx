"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const DeleteProductAlertDialog = ({ productId }: { productId: string }) => {
  const { toast } = useToast();

  const handleAccept = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response && response.ok) {
      toast({
        description: "Product has been deleted.",
        duration: 2800,
      });

      setTimeout(() => {
        window.location.href = window.location.href;
      }, 3000);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="destructive">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleAccept(productId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductAlertDialog;
