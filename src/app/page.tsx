interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Home = async () => {
  const response = await fetch(
    "http://localhost:3333/products?page=1&pageSize=10",
    {
      method: "GET",
    }
  );

  const { items } = await response.json();

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {items.map((product: Product) => (
        <span key={product.id}>{product.name}</span>
      ))}
    </main>
  );
};

export default Home;
