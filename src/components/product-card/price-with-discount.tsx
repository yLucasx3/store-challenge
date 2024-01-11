import { formatToCurrency } from "@/lib/utils";

const calculateDiscountPrice = (
  currentPrice: number,
  discountPercentage: number
) => {
  return Number(currentPrice - currentPrice * discountPercentage);
};

const ProductPriceWithDiscount = ({
  price,
  discountPercentage,
}: {
  price: number;
  discountPercentage: number;
}) => {
  return (
    <div className="flex gap-2 ">
      <span className="font-normal line-through text-emphasis">
        {formatToCurrency(price)}
      </span>
      <span className="font-bold text-emphasis">
        {formatToCurrency(calculateDiscountPrice(price, discountPercentage))}
      </span>
    </div>
  );
};

export default ProductPriceWithDiscount;
