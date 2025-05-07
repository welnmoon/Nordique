import { montserrat } from "@/utils/fonts";
import { Button } from "antd";

const QuoteBlock = () => {
  return (
    <div className="text-center mb-10">
      <p
        className={`${montserrat.className} w-100 px-4 max-w-2xl mx-auto text-gray-800 text-lg md:text-xl font-semibold tracking-wide mb-4`}
      >
        Townsman Automatic Brown Leather Watch
      </p>
      <Button className="bg-amber-900">Посмотреть {`->`}</Button>
    </div>
  );
};

export default QuoteBlock;
