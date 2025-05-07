"use client";
import { useState } from "react";
import UserInfo from "./UserInfo";
import Orders from "./Orders";
import Favorites from "./Favorites";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("userInfo");

  return (
    <div className="w-500 flex max-w-5xl mx-auto mt-10 gap-10">
      <div className="w-64 border-r pr-4">
        <ul className="flex flex-col gap-4 text-md md:text-lg">
          <li
            onClick={() => setActiveTab("userInfo")}
            className="cursor-pointer"
          >
            Аккаунт
          </li>
          <li onClick={() => setActiveTab("orders")} className="cursor-pointer">
            Заказы
          </li>
          <li
            onClick={() => setActiveTab("favorites")}
            className="cursor-pointer"
          >
            Избранное
          </li>
          <li
            onClick={() => setActiveTab("settings")}
            className="cursor-pointer"
          >
            Настройки
          </li>
          <li onClick={() => setActiveTab("help")} className="cursor-pointer">
            Поддержка
          </li>
        </ul>
      </div>
      <div>
        {activeTab === "userInfo" && <UserInfo />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "favorites" && <Favorites/>}
      </div>
    </div>
  );
};

export default Profile;
