"use client";
import useProfile from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();
  const [image, setImage] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      toast("Uploading the file...");
      const storageRef = ref(
        storage,
        `images/${file.name + new Date().getTime()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          console.log("Upload complete");
          toast("Upload complete", { icon: "🎉" });
          const downloadURL = await getDownloadURL(storageRef);
          setImage(downloadURL);
          setUserImage(downloadURL);
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: downloadURL }),
          });
          if (!response.ok) {
            console.error("Failed to upload image to server.");
          }
        }
      );
    } else {
      console.log("No file");
      setImage("");
    }
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8 max-w-md mx-auto">
        <div
          className="grid items-start gap-4"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label htmlFor="">Item Name</label>
            <input type="text" name="" id="" />
            <label htmlFor="">Description</label>
            <input type="text" name="" id="" />
            <label htmlFor="">Base Price</label>
            <input type="text" name="" id="" />
          </div>
        </div>
      </form>
    </section>
  );
}
