import ProductList from "@/components/ProductList";
import { getProducts } from "@/utils/getProducts";

const ProductPage = async () => {
  const products = await getProducts();

  return (
    <div className={`text-center e`}>
      <h1 className="text-4xl font-bold mb-4">All products</h1>
      {products && products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>Загрузка продуктов...</p>
      )}
    </div>
  );
};

export default ProductPage;
