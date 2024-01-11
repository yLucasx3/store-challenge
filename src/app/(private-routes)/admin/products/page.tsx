import { DataTable } from "@/components/product.data.table";
import { columns } from "./columns";
import { getProducts } from "@/app/actions";

const INITIAL_NUMBER_OF_PRODUCTS = 10;

const ProductListPage = async () => {
  const products = await getProducts(0, INITIAL_NUMBER_OF_PRODUCTS);

  return (
    <main className="container mx-auto">
      <DataTable columns={columns} data={products} />
    </main>
  );
};

export default ProductListPage;
