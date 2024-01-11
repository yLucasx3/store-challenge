import { Product, ProductCart } from "@/types/product";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { useAppDispatch } from "@/redux/hooks";
import { addProductToCart } from "@/redux/features/cart-slice";
import { useToast } from "../ui/use-toast";
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons";

interface ProductCardFooterProps {
  product: Product;
}

const ProductCardFooter = ({ product }: ProductCardFooterProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: ProductCart) => {
    dispatch(addProductToCart(product));
    toast({
      description: (
        <div className="flex items-center gap-4">
          <CheckIcon />
          Product added to cart :)
        </div>
      ),
    });
  };

  return (
    <CardFooter>
      <Button
        className="w-full bg-emphasis text-white"
        variant="ghost"
        onClick={() => handleAddToCart({ ...product, quantity: 1 })}
      >
        <PlusIcon className="mr-2 h-4 w-4" /> Add to cart
      </Button>
    </CardFooter>
  );
};

export default ProductCardFooter;
