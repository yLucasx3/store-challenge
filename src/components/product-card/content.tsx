import { CardContent } from "../ui/card";
import { ReactNode } from "react";

interface ProductCardContentProps {
  name: string;
  children: ReactNode;
}

const ProductCardContent = ({ name, children }: ProductCardContentProps) => {
  return (
    <CardContent className="flex flex-col mt-2 space-y-4">
      <span className="font-normal truncate ..." title={name}>
        {name}
      </span>
      {children}
    </CardContent>
  );
};

export default ProductCardContent;
