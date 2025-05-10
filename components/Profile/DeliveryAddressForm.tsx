"use client";

import { SavedAddress } from "@/types";
import { Button, Form, Input, message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DeliveryAddressForm = () => {
  const { data: session } = useSession();
  const [address, setAddress] = useState<SavedAddress | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasAddress = !!address;

  // GET
  useEffect(() => {
    const fetchAddress = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(
          `http://localhost:5185/api/savedaddress?email=${session.user.email}`
        );

        if (!res.ok) return;

        const data: SavedAddress = await res.json();
        setAddress(data);
      } catch (error) {
        console.error("Ошибка при получении адреса:", error);
      }
    };

    fetchAddress();
  }, [session]);

  // POST
  const onFinish = async (values: Omit<SavedAddress, "id" | "userEmail">) => {
    if (!session?.user?.email) {
      message.error("Сначала войдите в аккаунт");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5185/api/savedaddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          userEmail: session.user.email,
        }),
      });

      if (!response.ok) throw new Error("Не удалось сохранить адрес");

      message.success("Адрес успешно сохранён");

      setAddress({ ...values, userEmail: session.user.email, id: Date.now() });
      setEditMode(false);
    } catch (err) {
      console.error(err);
      message.error("Ошибка при сохранении адреса");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-max bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        {hasAddress ? "Ваш адрес доставки" : "Сохранить адрес доставки"}
      </h2>

      {hasAddress && !editMode && (
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <p>
            <strong>Имя:</strong> {address.recipientName}
          </p>
          <p>
            <strong>Телефон:</strong> {address.phone}
          </p>
          <p>
            <strong>Город:</strong> {address.city}
          </p>
          <p>
            <strong>Адрес:</strong> {address.address}
          </p>
          <p>
            <strong>Индекс:</strong> {address.zip}
          </p>

          <Button onClick={() => setEditMode(true)}>Изменить</Button>
        </div>
      )}

      {(editMode || !hasAddress) && (
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={address || undefined}
        >
          <Form.Item
            label="ФИО получателя"
            name="recipientName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Телефон" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Город" name="city" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Адрес" name="address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Индекс" name="zip">
            <Input />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-4">
              <Button type="primary" htmlType="submit" loading={loading}>
                Сохранить
              </Button>
              {hasAddress && (
                <Button onClick={() => setEditMode(false)} disabled={loading}>
                  Отмена
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default DeliveryAddressForm;
