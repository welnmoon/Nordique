"use client";

import { Button, Form, Input, Select } from "antd";
import { useState } from "react";

const { Option } = Select;

interface Props {
  onFinish: (values: any) => void;
}

const DeliveryForm = ({ onFinish }: Props) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = [
    "Алматы",
    "Астана",
    "Шымкент",
    "Актобе",
    "Караганда",
    "Тараз",
    "Павлодар",
    "Усть-Каменогорск",
    "Семей",
    "Костанай",
    "Кызылорда",
    "Уральск",
    "Атырау",
    "Петропавловск",
    "Темиртау",
    "Туркестан",
    "Экибастуз",
    "Рудный",
    "Жезказган",
    "Балхаш",
  ];

  return (
    <Form layout="vertical" onFinish={onFinish}>
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
          onChange={(value) => setSelectedCity(value)}
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
