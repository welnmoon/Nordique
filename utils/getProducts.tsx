import { stripe } from "@/lib/stripe";

export const getProducts = async () => {
  try {
    const data = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 100,
      active: true,
    });
    return data.data;
  } catch (error) {
    console.error("Ошибка загрузки продуктов:", error);
  }
};
