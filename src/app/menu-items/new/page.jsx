"use client";
import React from "react";
import useProfile from "../../../components/UseProfile";
import UserTabs from "../../../components/layout/UserTabs";
import { useState } from "react";
import Link from "next/link";
import EditableImage from "../../../components/layout/EditableImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
const NewMenuItem = () => {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const handleFormSubmit = async (e, data) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/menuItems", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Menu Item Created");
        setRedirectToItems(true);
      } else {
        toast.error("Error Creating Menu Item");
      }
    } catch (error) {
      console.error("Error Creating Menu Item:", error);
      toast.error("Error Creating Menu Item");
    }
  };
  if (redirectToItems) {
    redirect("/menu-items");
  }
  const { loading, data } = useProfile();
  if (loading) return <div>Loading...</div>;
  if (!data.admin) return <div>Not an Admin</div>;
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className=" flex max-w-lg mx-auto mt-8">
        <Link href="/menu-items" className="button">
          <span>Show All Menu Items</span>
          <Left />
        </Link>
      </div>
      <MenuItemForm
        onSubmit={handleFormSubmit}
        menuItem={{}}
      />
    </section>
  );
};

export default NewMenuItem;
