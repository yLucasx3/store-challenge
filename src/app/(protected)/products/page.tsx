import { DataTable } from "@/components/ui/data.table";
import { Product, columns } from "./columns";

async function getProducts(): Promise<Product[]> {
  return [
    {
      id: "728ed52f",
      picture:
        "https://m.media-amazon.com/images/I/61JDYBJMvWL.__AC_SX300_SY300_QL70_ML2_.jpg",
      name: "Headset Sem Fio Logitech G Astro A30 LIGHTSPEED",
      price: 1699.99,
      description:
        "Amplifique o seu tempo de jogo com um headset que funciona em qualquer dispositivo. O headset sem fio para jogos A30 pode ser levado para qualquer lugar e permite que você jogue em qualquer plataforma",
    },
  ];
}

const ProductListPage = async () => {
  const products = await getProducts();

  return (
    <main className="container mx-auto">
      <DataTable columns={columns} data={products} />
    </main>
  );
};

export default ProductListPage;
