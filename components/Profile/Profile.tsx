"use client";
import { useState } from "react";
import UserInfo from "./UserInfo";
import Orders from "./Orders";
import Favorites from "./Favorites";
import Settings from "./Settings";
import Support from "./Support";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("userInfo");

  const navItems = [
    { key: "userInfo", label: "Аккаунт" },
    { key: "orders", label: "Заказы" },
    { key: "favorites", label: "Избранное" },
    { key: "settings", label: "Настройки" },
    { key: "support", label: "Поддержка" },
  ];

  return (
    <div className="flex max-w-5xl mx-auto mt-10 gap-10 w-full">
      <div className="w-64 border-r pr-4">
        <ul className="flex flex-col gap-2 text-md md:text-lg">
          {navItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`cursor-pointer px-4 py-2 rounded transition-all ${
                activeTab === item.key
                  ? "bg-gray-100 font-semibold border-l-4 border-black text-black"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        {activeTab === "userInfo" && <UserInfo />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "favorites" && <Favorites />}
        {activeTab === "settings" && <Settings />}
        {activeTab === "support" && <Support />}
      </div>
    </div>
  );
};

export default Profile;
