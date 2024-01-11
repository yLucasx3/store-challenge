import CreateProductForm from "@/components/create-product-form";

const ProductCreatePage = () => {
  return (
    <main
      className="flex flex-col container items-center justify-center py-4"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <h1>Create product</h1>
      <CreateProductForm />
    </main>
  );
};

export default ProductCreatePage;
