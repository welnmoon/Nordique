"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/types";

export const checkoutAction = async (formData: FormData): Promise<string> => {
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson) as CartItem[];

  const line_items = items.map((item) => ({
    price_data: {
      currency: "kzt",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  return session.url!;
};
