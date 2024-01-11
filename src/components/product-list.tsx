"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/app/actions";
import { useInView } from "react-intersection-observer";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { useDebounce } from "use-debounce";
import OrderByProductsSelect from "./order-by-products-select";
import { ProductCard } from "./product-card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProducts } from "@/redux/features/product-slice";

interface ProductListProps {
  initialProducts: Product[];
}

const NUMBER_OF_PRODUCTS_TO_FETCH = 3;

const DEFAULT_PRODUCT_IMAGE =
  "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";

const ProductList = ({ initialProducts }: ProductListProps) => {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<string>("");
  const [offset, setOffset] = useState<number>(initialProducts.length);
  const [noMoreData, setNoMoreData] = useState(false);
  const [debouncedFilter] = useDebounce(filter, 500);

  const { ref, inView } = useInView();

  const loadMoreProducts = async () => {
    const apiProducts = await getProducts(offset, NUMBER_OF_PRODUCTS_TO_FETCH);

    if (!apiProducts.length) {
      setNoMoreData(true);
      return;
    }

    dispatch(setProducts([...products, ...apiProducts]));
    setOffset(offset + NUMBER_OF_PRODUCTS_TO_FETCH);
  };

  const filterProducts = async () => {
    if (!debouncedFilter.length) {
      dispatch(setProducts(initialProducts));
      setOffset(initialProducts.length);
      return;
    }

    if (debouncedFilter.length) {
      const apiProducts = await getProducts(0, NUMBER_OF_PRODUCTS_TO_FETCH, {
        field: "name",
        value: debouncedFilter,
      });

      dispatch(setProducts(apiProducts));
      setOffset(0);
    }
  };

  useEffect(() => {
    dispatch(setProducts(initialProducts));
  }, []);

  useEffect(() => {
    if (inView && !debouncedFilter.length) {
      loadMoreProducts();
    }
  }, [inView]);

  useEffect(() => {
    filterProducts();
  }, [debouncedFilter]);

  return (
    <div className="flex flex-col w-7/12 gap-4 items-center">
      <div className="flex w-full gap-4">
        <Input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search products..."
        />
        <OrderByProductsSelect />
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="w-full grid grid-cols-3 gap-4">
          {products.map((product, index) => {
            const { id, name, price, image, discountPercentage } = product;

            return (
              <ProductCard.Root key={id} index={index}>
                <ProductCard.Header
                  title={name}
                  image={image ?? DEFAULT_PRODUCT_IMAGE}
                />
                <ProductCard.Content
                  name={name}
                  price={price}
                  discountPercentage={discountPercentage}
                />
                <ProductCard.Footer product={product} />
              </ProductCard.Root>
            );
          })}
        </div>
        {noMoreData ? (
          <span className="p-6">No more results :/</span>
        ) : (
          <div ref={ref} className="flex items-center p-6">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
