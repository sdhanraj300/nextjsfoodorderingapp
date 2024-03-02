"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const UserTabs = ({ isAdmin }) => {
  const path = usePathname();
  return (
    <div className="flex gap-2 tabs mx-auto justify-center mb-10">
      <Link className={path === "/profile" ? "active" : ""} href="/profile">
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href="/categories"
          >
            Categories
          </Link>
          <Link
            className={path.includes("menu-items") ? "active" : ""}
            href="menu-items"
          >
            Menu Items
          </Link>
          <Link className={path === "/users" ? "active" : ""} href="users">
            Users
          </Link>
          <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
            Orders
          </Link>
        </>
      )}
    </div>
  );
};

export default UserTabs;
