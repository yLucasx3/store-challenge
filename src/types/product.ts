export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  discountPercentage?: number;
}

export interface ProductCart extends Product {
  quantity: number;
}

export interface ProductAPIResponse {
  items: Product[];
  pageInfo: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}
