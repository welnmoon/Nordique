"use client";

import { Order, Review } from "@/types";
import { Button, Form, Input, Select } from "antd";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Stripe from "stripe";

interface Props {
  product: Stripe.Product;
}

const AddReview = ({ product }: Props) => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [overallRating, setOverallRating] = useState<number>();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const canReview = hasPurchased && !hasReviewed;

  useEffect(() => {
    const overallRating =
      reviews.reduce((sum, cur) => sum + cur.rating, 0) / reviews.length;
    setOverallRating(overallRating);
  }, [reviews]);

  // GET
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      try {
        const [ordersRes, reviewsRes] = await Promise.all([
          fetch(`http://localhost:5185/api/orders?email=${session.user.email}`),
          fetch(`http://localhost:5185/api/reviews?productId=${product.id}`),
        ]);

        const [ordersData, reviewsData]: [Order[], Review[]] =
          await Promise.all([ordersRes.json(), reviewsRes.json()]);

        setOrders(ordersData);
        setReviews(reviewsData);

        const purchased = ordersData.some((order) =>
          order.items.some((item) => item.id === product.id)
        );

        const reviewed = reviewsData.some(
          (review) => review.userEmail === session.user?.email
        );

        setHasPurchased(purchased);
        setHasReviewed(reviewed);
      } catch (err) {
        console.error("Ошибка при получении заказов или отзывов:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return setError("Вы должны быть авторизованы");
    if (comment.trim().length === 0) return setError("Вы ничего не написали");

    setLoading(true);
    setError("");
    setSuccess(false);

    const review = {
      userEmail: session.user.email,
      productId: product.id,
      comment,
      rating,
    };

    try {
      const res = await fetch("http://localhost:5185/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Ошибка при сохранении");
      }

      setSuccess(true);
      setComment("");
      setRating(5);
      setHasReviewed(true);
    } catch (error: any) {
      setError(error.message || "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto">
      <div className="flex gap-4 items-center text-center mb-6">
        <div className="flex items-center gap-1 text-2xl">
          <span>★</span>
          {overallRating}
        </div>
        <div className="text-base text-gray-600">{reviews.length} отзывов</div>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Добавить отзыв</h3>

      {success && (
        <p className="text-green-600 mb-2">Отзыв успешно добавлен!</p>
      )}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {canReview ? (
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Form.Item label="Оставьте отзыв" name="comment">
            <Input.TextArea
              className="max-h-40 overflow-y-auto"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Рейтинг" name="rating">
            <Select value={rating} onChange={(value) => setRating(value)}>
              {[1, 2, 3, 4, 5].map((r) => (
                <Select.Option key={r} value={r}>
                  {r}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Отправить
            </Button>
          </Form.Item>
        </Form>
      ) : (
        !loading && (
          <p className="text-gray-500 text-sm mt-2">
            {hasPurchased && hasReviewed
              ? "Вы уже оставили отзыв на этот товар."
              : "Оставлять отзывы могут только те, кто покупал этот товар."}
          </p>
        )
      )}
    </div>
  );
};

export default AddReview;
