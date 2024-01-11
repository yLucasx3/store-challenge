import { getProducts } from "./actions";
import ProductList from "@/components/product-list";

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    offset?: string;
    limit?: string;
  };
}) => {
  const query = searchParams?.query;
  const offset = Number(searchParams?.offset) || 0;
  const limit = Number(searchParams?.limit) || 6;

  const initialProducts = await getProducts(offset, limit, query);

  return (
    <main className="flex flex-col py-6 items-center">
      <ProductList initialProducts={initialProducts} />
    </main>
  );
};

export default Home;
