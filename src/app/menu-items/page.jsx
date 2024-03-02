"use client";
import React, { useState } from "react";
import Link from "next/link";
import EditableImage from "@/components/layout/EditableImage";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuItemsPage = () => {
  const { loading, data } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (!data.admin) return <div>Not an Admin</div>;
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8 flex">
        <Link className="button" href="/menu-items/new">
          Create A New Menu Item
          <Right/>
        </Link>
      </div>
    </section>
  );
};

export default MenuItemsPage;
