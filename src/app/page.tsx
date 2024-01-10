import OrderByProductsSelect from "@/components/order-by-products-select";
import { Input } from "@/components/ui/input";
import { fetchProducts } from "./action";
import LoadMoreProducts from "@/components/load-more-products";

const Home = async () => {
  const data = fetchProducts(1);

  return (
    <main className="flex flex-col py-6">
      <div className="container flex flex-col p-2 items-center">
        <div className="flex w-2/3 gap-4">
          <Input type="text" placeholder="Search products..." />
          <OrderByProductsSelect />
        </div>
        <div className="columns-3 mx-auto space-y-4 py-16">
          {data}
          <LoadMoreProducts />
        </div>
      </div>
    </main>
  );
};

export default Home;
