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
import {redirect} from "next/navigation";
const NewMenuItem = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = { name, image, description, price };

    try {
      const response = await fetch("/api/menuItems", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Menu Item Created");
        setName("");
        setDescription("");
        setPrice(0);
        setImage("");
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
      <div className=" flex max-w-md mx-auto mt-8">
        <Link href="/menu-items" className="button">
          <span>Show All Menu Items</span>
          <Left />
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
        <div
          className="grid items-start gap-4"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label htmlFor="">Item Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
            />
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            />
            <label htmlFor="">Base Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              name="price"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full text-white p-2 rounded-lg bg-blue-500"
        >
          Add Item
        </button>
      </form>
    </section>
  );
};

export default NewMenuItem;
