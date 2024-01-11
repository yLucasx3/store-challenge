"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/app/actions";
import { useInView } from "react-intersection-observer";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { ProductCard } from "./product-card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProducts } from "@/redux/features/product-slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductListProps {
  initialProducts: Product[];
}

const NUMBER_OF_PRODUCTS_TO_FETCH = 3;

const DEFAULT_PRODUCT_IMAGE =
  "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";

const ProductList = ({ initialProducts }: ProductListProps) => {
  const [offset, setOffset] = useState<number>(initialProducts.length);
  const [noMoreData, setNoMoreData] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(setProducts(initialProducts));
  }, []);

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  useEffect(() => {
    dispatch(setProducts(initialProducts));
    setNoMoreData(false);
    setOffset(initialProducts.length);
  }, [initialProducts]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-11/12 md:w-8/12 xl:w-7/12 ">
      <Input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder="Search products..."
      />
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full grid items-center justify-center gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const { id, name, price, image, discountPercentage } = product;

            return (
              <ProductCard.Root key={id}>
                <ProductCard.Header
                  title={name}
                  image={image ?? DEFAULT_PRODUCT_IMAGE}
                />
                <ProductCard.Content name={name}>
                  {discountPercentage ? (
                    <ProductCard.WithDiscount
                      price={price}
                      discountPercentage={discountPercentage}
                    />
                  ) : (
                    <ProductCard.WithoutDiscount price={price} />
                  )}
                </ProductCard.Content>
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
