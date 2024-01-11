import ProductCardContent from "./content";
import ProductCardFooter from "./footer";
import ProductCardHeader from "./header";
import ProductPriceWithDiscount from "./price-with-discount";
import ProductPriceWithoutDiscount from "./price-without-discount";
import ProductCardRoot from "./root";

export const ProductCard = {
  Root: ProductCardRoot,
  Header: ProductCardHeader,
  Content: ProductCardContent,
  WithDiscount: ProductPriceWithDiscount,
  WithoutDiscount: ProductPriceWithoutDiscount,
  Footer: ProductCardFooter,
};
