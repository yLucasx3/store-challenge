"use server";

import ProductCard from "@/components/product-card";

const PAGE_SIZE = 9;

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export type ProductCardType = JSX.Element;

export async function fetchProducts(page: number): Promise<ProductCardType[]> {
  const response = await fetch(
    `http://localhost:3333/products?page=${page}&pageSize=${PAGE_SIZE}`
  );

  const { items: products } = await response.json();

  return products.map(({ id, name, price, image }: Product, index: number) => (
    <ProductCard
      key={id}
      index={index}
      name={name}
      price={price}
      image={image}
    />
  ));
}
