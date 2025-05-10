import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { stripe } from "@/lib/stripe";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
}
