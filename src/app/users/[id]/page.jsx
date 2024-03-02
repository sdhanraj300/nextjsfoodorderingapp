"use client";
import useProfile from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUserPage = () => {
  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "An error has occurred while saving the user",
    });
  }

  const { id } = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`/api/profile?_id=${id}`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, []);

  const { loading, data } = useProfile();
  if (loading) return <div>Loading...</div>;
  if (!data.admin) return <div>Access Denied</div>;
  return (
    <section className="mt-8 mx-auto max-w-xl">
      <UserTabs isAdmin={true} />
      <div className="">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
};

export default EditUserPage;
