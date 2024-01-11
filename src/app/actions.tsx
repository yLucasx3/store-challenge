"use server";

import { enviroment } from "@/server/enviroment";
import { ProductAPIResponse } from "@/types/product";

export const getProducts = async (
  offset: number,
  limit: number,
  query?: string
) => {
  try {
    let url = `${enviroment.apiUrl}/products?offset=${offset}&limit=${limit}`;

    if (query) url += `&filter[name]=${query}`;

    const response = await fetch(url, { cache: "no-store" });

    const { items: products } = (await response.json()) as ProductAPIResponse;

    return products || [];
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};
