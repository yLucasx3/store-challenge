"use client";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import {
  addQuantityOfProductsToCart,
  removeProductFromCart,
  subtractQuantityOfProductsToCart,
} from "@/redux/features/cart-slice";
import { ProductCart } from "@/types/product";
import { formatToCurrency } from "@/lib/utils";
import { Badge } from "./ui/badge";

const DEFAULT_PRODUCT_IMAGE =
  "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";

const Cart = () => {
  const { items, amount } = useAppSelector((state) => state.cart);

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const dispatch = useAppDispatch();

  const handleRemoveProductFromCart = (product: ProductCart) => {
    dispatch(removeProductFromCart(product));
  };

  const handleAddQuantityOfProductsToCart = (product: ProductCart) => {
    dispatch(addQuantityOfProductsToCart(product));
  };

  const handleSubtractQuantityOfProductsToCart = (productId: string) => {
    dispatch(subtractQuantityOfProductsToCart({ productId }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          {totalItems ? (
            <Badge className="absolute -top-2 -right-5" variant="destructive">
              {totalItems}
            </Badge>
          ) : null}
          Cart
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full md:w-2/3 lg:w-1/3">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        <div className="py-16 h-full overflow-y-auto">
          {!items.length && <span>Cart is empty!</span>}
          {items.length
            ? items.map((product) => {
                const { id, name, price, image, description, quantity } =
                  product;
                return (
                  <div key={id}>
                    <div className="flex gap-8 justify-between">
                      <div className="relative">
                        <span
                          className="absolute -top-3 -right-3 flex items-center justify-center font-light text-xs w-6 h-6 rounded-full bg-gray-600/75 cursor-pointer"
                          onClick={() => handleRemoveProductFromCart(product)}
                        >
                          X
                        </span>
                        <Image
                          src={image ?? DEFAULT_PRODUCT_IMAGE}
                          alt={name}
                          width={72}
                          height={62}
                          draggable={false}
                        />
                      </div>
                      <div className="flex flex-col w-1/3 justify-start ">
                        <span className="text-base truncate ...">{name}</span>
                        <span className="text-sm text-slate-500 truncate ...">
                          {description}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className="font-semibold text-sm">
                          ${(quantity * price).toFixed(2)}
                        </span>
                        <div className="flex items-center justify-around w-24 h-8 px-2 gap-4 border rounded-full">
                          <span
                            className="cursor-pointer font-semibold text-slate-500 text-xl"
                            onClick={() =>
                              handleSubtractQuantityOfProductsToCart(id)
                            }
                          >
                            -
                          </span>
                          <span className="text-xs">{quantity}</span>
                          <span
                            className="cursor-pointer font-semibold text-slate-500 text-xl"
                            onClick={() =>
                              handleAddQuantityOfProductsToCart(product)
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-5" />
                  </div>
                );
              })
            : null}
        </div>

        <SheetFooter>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Shipping</span>
              <span className="text-slate-300">Calculated at checkout</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-slate-300">Total</span>
              <span className="text-lg font-semibold">
                {formatToCurrency(amount)}
              </span>
            </div>
            <SheetClose asChild className="mt-4">
              <Button type="submit">
                Proceed to Checkout <ArrowRightIcon className="ml-2" />
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
