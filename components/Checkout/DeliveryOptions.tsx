import { deliveryOptions } from "@/data/deliveryOptions";
import { formatPrice } from "@/utils/formatPrice";
import { Radio } from "antd";
import { Dispatch, SetStateAction } from "react";

import { MdLocalFireDepartment } from "react-icons/md";

interface Props {
  setSelectedDelivery: Dispatch<SetStateAction<number>>;
  selectedDelivery: number;
}

const DeliveryOptions = ({ setSelectedDelivery, selectedDelivery }: Props) => {
  return (
    <Radio.Group
      onChange={(e) => setSelectedDelivery(e.target.value)}
      value={selectedDelivery}
      className="w-full"
    >
      <div className="flex flex-col gap-4 w-1/1">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className="relative p-2 border rounded-sm hover:bg-gray-50 "
          >
            <Radio value={option.id} className="flex items-start">
              <div className="ml-2 flex flex-col gap-1">
                <p className="font-semibold text-lg">{option.title}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
                <p className="text-sm">
                  {option.price ? (
                    <span className="text-black font-semibold">
                      {formatPrice(option.price)}
                    </span>
                  ) : (
                    <span className="text-green-600">Бесплатно</span>
                  )}
                </p>
              </div>
            </Radio>
            {option.fire && (
              <MdLocalFireDepartment
                size={"2rem"}
                className="absolute -right-3 -top-3 pointer-events-none"
                color="#e25822"
              />
            )}
          </div>
        ))}
      </div>
    </Radio.Group>
  );
};

export default DeliveryOptions;
