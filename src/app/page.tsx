import { getProducts } from "./actions";
import ProductList from "@/components/product-list";

const INITIAL_NUMBER_OF_PRODUCTS = 6;

const Home = async () => {
  const initialProducts = await getProducts(0, INITIAL_NUMBER_OF_PRODUCTS);

  return (
    <main className="flex flex-col py-6 items-center">
      <ProductList initialProducts={initialProducts} />
    </main>
  );
};

export default Home;
