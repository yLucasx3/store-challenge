import CreateProductForm from "@/components/create-product-form";

const ProductCreatePage = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Create product</h1>
      <CreateProductForm />
    </main>
  );
};

export default ProductCreatePage;
