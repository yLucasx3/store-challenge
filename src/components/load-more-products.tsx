"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { ProductCardType, fetchProducts } from "../app/action";
import { ReloadIcon } from "@radix-ui/react-icons";

let page = 2;

function LoadMoreProducts() {
  const { ref, inView } = useInView();

  const [productCards, setProductCards] = useState<ProductCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noMoreItems, setNoMoreItems] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 500;

      const timeoutId = setTimeout(async () => {
        const moreProductCards = await fetchProducts(page);

        if (!moreProductCards.length) {
          setNoMoreItems(true);
          setIsLoading(false);
          return;
        }

        setProductCards((prevState) => [...prevState, ...moreProductCards]);
        page++;

        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, productCards, isLoading]);

  return (
    <>
      {productCards}
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && isLoading && !noMoreItems && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMoreProducts;
