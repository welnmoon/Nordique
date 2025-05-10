import { Review } from "@/types";
import { Form, Input } from "antd";

interface Props {
  reviews: Review[];
}

const Reviews = ({ reviews }: Props) => {
  if (!reviews) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-medium mb-4">Отзывы</h2>
        <p className="text-gray-500">Отзывы загружаются...</p>
      </div>
    );
  }
  return (
    <div>
      {/*Reviews*/}
      <div className="mt-10">
        <h2 className="text-2xl font-medium mb-4">Отзывы</h2>

        {/* Здесь будет список отзывов */}
        {reviews.length === 0 ? (
          <p className="text-gray-500">Пока нет отзывов на этот товар.</p>
        ) : (
          <div>
            {/*Reviews*/}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border p-4 rounded-lg bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-700 font-semibold">
                      {review.userEmail}
                    </p>
                    <div className="flex text-yellow-400">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
