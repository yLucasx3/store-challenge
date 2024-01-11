import { cn } from "@/lib/utils";
import { MotionDiv } from "../motion-div";
import { Card } from "../ui/card";
import { ComponentProps } from "react";

type CardProps = ComponentProps<typeof Card>;

interface ProductCardRootProps extends CardProps {
  index: number;
}

const ProductCardRoot = ({
  index,
  className,
  children,
  ...props
}: ProductCardRootProps) => {
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
      <Card className={cn("overflow-hidden", className)} {...props}>
        {children}
      </Card>
    </MotionDiv>
  );
};

export default ProductCardRoot;
