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
import { enviroment } from "@/server/enviroment";

const DeleteProductAlertDialog = ({ productId }: { productId: string }) => {
  const { toast } = useToast();

  const handleAccept = async (id: string) => {
    try {
      const response = await fetch(`${enviroment.apiUrl}/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          description: "Product has been deleted.",
          duration: 2800,
        });

        setTimeout(() => {
          window.location.href = window.location.href;
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Error deleting product, please contact support.",
        description: String(error),
        variant: "destructive",
      });
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
