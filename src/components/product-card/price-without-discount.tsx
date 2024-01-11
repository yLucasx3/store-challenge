import { formatToCurrency } from "@/lib/utils";

const ProductPriceWithoutDiscount = ({ price }: { price: number }) => {
  return (
    <span className="font-bold text-emphasis">{formatToCurrency(price)}</span>
  );
};

export default ProductPriceWithoutDiscount;
