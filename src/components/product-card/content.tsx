import { formatToCurrency } from "@/lib/utils";
import { CardContent } from "../ui/card";

interface ProductCardContentProps {
  name: string;
  price: number;
  discountPercentage?: number;
}

const calculateDiscountPrice = (
  currentPrice: number,
  discountPercentage: number
) => {
  return Number(currentPrice - currentPrice * discountPercentage);
};

const ProductCardContent = ({
  name,
  price,
  discountPercentage,
}: ProductCardContentProps) => {
  return (
    <CardContent className="flex flex-col mt-2 space-y-4">
      <span className="font-normal truncate ..." title={name}>
        {name}
      </span>
      {discountPercentage ? (
        <div className="flex gap-2 ">
          <span className="font-normal line-through text-emphasis">
            {formatToCurrency(price)}
          </span>
          <span className="font-bold text-emphasis">
            {formatToCurrency(
              calculateDiscountPrice(price, discountPercentage)
            )}
          </span>
        </div>
      ) : (
        <span className="font-bold text-emphasis">
          {formatToCurrency(price)}
        </span>
      )}
    </CardContent>
  );
};

export default ProductCardContent;
