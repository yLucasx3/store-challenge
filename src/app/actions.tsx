"use server";

import { ProductAPIResponse } from "@/types/product";

export const getProducts = async (
  offset: number,
  limit: number,
  filter?: { field: string; value: string | number }
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/products?offset=${offset}&limit=${limit}`;

    console.log(url);

    if (filter) url += `&filter[${filter.field}]=${filter.value}`;

    const response = await fetch(url, { cache: "no-store" });

    const { items: products } = (await response.json()) as ProductAPIResponse;

    return products || [];
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};
