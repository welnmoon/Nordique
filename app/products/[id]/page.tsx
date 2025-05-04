import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/lib/stripe";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
};

export default ProductPage;
