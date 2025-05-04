"use client";
import { Button } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import DeliveryAddressForm from "./DeliveryAddressForm";

const UserInfo = () => {
  const session = useSession();

  return (
    <div>
      {session.data ? (
        <div>
          <div className="mb-10 flex flex-col gap-4">
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
          <div>
            <h2 className="text-2xl">Адрес доставки</h2>
            {/* <span>Имя получателя: </span>
            <span>-</span> */}
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
