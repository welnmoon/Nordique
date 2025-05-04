import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: PageProps) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}

// (необязательно) SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Товар: ${params.id} | Nordique`,
  };
}
