"use client";

import { DeliveryFormValues, Order } from "@/types";
import { cities } from "@/utils/constant";
import { Form, Input, Select } from "antd";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const { Option } = Select;

interface Props {
  onFinish: (values: DeliveryFormValues) => void;
}

const DeliveryForm = ({ onFinish }: Props) => {
  const { data: session } = useSession();

  //antd hook
  const [form] = Form.useForm();
  useEffect(() => {
    if (!session?.user?.email) return;

    const getAddress = async () => {
      try {
        const res = await fetch(
          `http://localhost:5185/api/orders?email=${session?.user?.email}`
        );
        const orders: Order[] = await res.json();
        if (orders.length > 0) {
          const lastOrder = orders[orders.length - 1];
          const mapped = {
            name: lastOrder.recipientName,
            phone: lastOrder.phone,
            city: lastOrder.city,
            address: lastOrder.address,
            zip: lastOrder.zip,
          };

          form.setFieldsValue(mapped);
        }
      } catch (error) {
        console.error("Ошибка при получении адреса", error);
      }
    };
    getAddress();
  }, [session, form]);

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        label="Имя получателя"
        name="name"
        rules={[{ required: true, message: "Введите ваше имя" }]}
      >
        <Input required placeholder="Введите ваше имя" />
      </Form.Item>

      <Form.Item
        label="Номер телефона"
        name="phone"
        rules={[{ required: true, message: "Введите номер телефона" }]}
      >
        <Input required placeholder="Введите номер телефона" />
      </Form.Item>

      <Form.Item
        label="Город"
        name="city"
        rules={[{ required: true, message: "Выберите страну" }]}
      >
        <Select
          showSearch
          placeholder="Выберите город"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {cities.map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Адрес" name="address">
        <Input placeholder="Введите ваш адрес" />
      </Form.Item>

      <Form.Item label="Почтовый индекс" name="zip">
        <Input required placeholder="Введите индекс" />
      </Form.Item>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Перейти к оплате
      </button>
    </Form>
  );
};

export default DeliveryForm;
