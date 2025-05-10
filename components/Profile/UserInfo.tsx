"use client";
import { Button } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import DeliveryAddressForm from "./DeliveryAddressForm";

const UserInfo = () => {
  const session = useSession();

  return (
    <div>
      {session.data ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-medium">
                {session.data?.user?.name}
              </h1>
              <p>{session.data?.user?.email}</p>
            </div>
            <Button type="primary" danger onClick={() => signOut()}>
              Выйти
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl">Адрес доставки</h2>

            <DeliveryAddressForm />
          </div>
        </div>
      ) : (
        <div>
          <h2>Вы не авторизованы</h2>
          <Button type="primary" onClick={() => signIn()}>
            Войти
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
