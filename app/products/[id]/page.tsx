import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/lib/stripe";

export default async function ProductPage(props: any) {
  const { params } = props;

  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
}

