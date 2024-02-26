"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import firebase from "firebase/app";
import "firebase/storage";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadTaskSnapshot,
} from "firebase/storage";

import { useEffect, useState } from "react";
const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const userImage = session?.data?.user?.image;
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState("");
  console.log(session);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.data?.user?.name);
    }
  }, [session, status]);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
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
          // Get the download URL after upload
          const downloadURL = await getDownloadURL(storageRef);
          console.log("Download URL:", downloadURL);
          setImage(downloadURL);
        }
      );
    } else {
      console.log("No file");
      setImage("");
    }
  }

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }
  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-xs mx-auto">
        {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border mb-4 border-green-300">
            Profile Saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-100 p-4 rounded-lg border mb-4 border-blue-300">
            Saving...
          </h2>
        )}
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <Image
                className="w-full h-full mb-1"
                src={userImage}
                width={250}
                height={250}
                alt={"avatar"}
              />
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 cursor-pointer rounded-lg p-2 text-center">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First And Last Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              disabled={true}
              value={session?.data?.user?.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
