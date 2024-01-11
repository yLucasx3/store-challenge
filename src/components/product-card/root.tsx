import { cn } from "@/lib/utils";
import { MotionDiv } from "../motion-div";
import { Card } from "../ui/card";
import { ComponentProps } from "react";

type CardProps = ComponentProps<typeof Card>;

const ProductCardRoot = ({ className, children, ...props }: CardProps) => {
  return (
    <MotionDiv
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{
        delay: 0.3,
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
