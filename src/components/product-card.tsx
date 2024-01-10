import { cn } from "@/lib/utils";
import { BellIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { ComponentProps } from "react";
import Image from "next/image";
import { MotionDiv } from "./motion-div";

type CardProps = ComponentProps<typeof Card>;

interface ProductCardProps extends CardProps {
  name: string;
  image: string;
  price: number;
  index: number;
}

const calculateDiscountPrice = (currentPrice: number) => {
  return Number(currentPrice - currentPrice * 0.05).toFixed(2);
};

const ProductCard = ({
  index,
  name,
  image,
  price,
  className,
  ...props
}: ProductCardProps) => {
  return (
    <MotionDiv
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded relative w-full"
    >
      <Card className={cn("w-[320px] overflow-hidden", className)} {...props}>
        <CardHeader className="p-0">
          {image && (
            <Image
              src={image}
              alt={name}
              width={320}
              height={0}
              draggable={false}
            />
          )}
        </CardHeader>
        <CardContent className="flex flex-col mt-2 space-y-4">
          <span
            className="font-normal overflow-hidden text-ellipsis"
            title={name}
          >
            {name}
          </span>
          <div className="flex gap-2 ">
            <span className="font-normal line-through text-emphasis">
              ${calculateDiscountPrice(price)}
            </span>
            <span className="font-bold text-emphasis">${price}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-emphasis text-white" variant="ghost">
            <PlusIcon className="mr-2 h-4 w-4" /> Add to cart
          </Button>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};

export default ProductCard;
