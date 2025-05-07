import { FavoriteItem } from "@/types";
import { Session } from "next-auth";
import Stripe from "stripe";

//DELETE

interface Props {
  productId: string;
  session: Session;
  setFavorites?: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}

export const removeFavorite = async ({
  productId,
  setFavorites,
  session,
}: Props) => {
  if (!session?.user?.email) return;

  await fetch(
    `http://localhost:5185/api/favorites?email=${session?.user?.email}&productId=${productId}`,
    { method: "DELETE" }
  );

  if (setFavorites) {
    setFavorites((prev) => prev.filter((f) => f.productId !== productId));
  }
};

// GET

interface getProps {
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  status: "authenticated" | "loading" | "unauthenticated";
  session: Session;
}

export const getFavorites = async ({
  setFavorites,
  setLoading,
  status,
  session,
}: getProps) => {
  if (!session?.user?.email) return;
  if (status !== "authenticated") return;

  try {
    const res = await fetch(
      `http://localhost:5185/api/favorites?email=${session?.user?.email}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    setFavorites(data);
  } catch (err) {
    console.error("Ошибка получения избранных:", err);
  } finally {
    setLoading(false);
  }
};

// Check

interface checkProps {
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  status: "authenticated" | "loading" | "unauthenticated";
  session: Session;
  product: Stripe.Product;
}

export const checkFavorite = async ({
  setIsFavorite,
  status,
  session,
  product,
}: checkProps) => {
  if (!session?.user?.email) return;
  if (status !== "authenticated") return;

  try {
    const res = await fetch(
      `http://localhost:5185/api/favorites?email=${session.user.email}`
    );
    const data = await res.json();
    const found = data.find(
      (item: FavoriteItem) => item.productId === product.id
    );
    setIsFavorite(!!found); // если нашли то преобзоруем в boolean
  } catch (error) {
    console.error("Ошибка проверки избранного:", error);
  }
};

//POST

interface postProps {
  product: Stripe.Product;
  price: Stripe.Price;
  session: Session;
  status: "authenticated" | "loading" | "unauthenticated";
}

export const postFavorite = async ({
  product,
  price,
  session,
  status,
}: postProps) => {
  if (!session?.user?.email) return;
  if (status !== "authenticated") return;

  await fetch("http://localhost:5185/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: product.id,
      name: product.name,
      image: product.images?.[0] ?? "",
      price: price.unit_amount! / 100,
      UserEmail: session?.user?.email,
    }),
  });
};
