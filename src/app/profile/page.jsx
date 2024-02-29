"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs";

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState("");
  const userImg = session?.data?.user?.image;
  const [profileFetched, setProfileFetched] = useState(false);
  console.log(session);

  const [userImage, setUserImage] = useState(session?.data?.user?.image);
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.data?.user?.name);
    }
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAddress(data.address);
        setCity(data.city);
        setCountry(data.country);
        setPhone(data.phone);
        setPostalCode(data.postalCode);
        setIsAdmin(data.admin);
        setProfileFetched(true);
      });
  }, [session, status]);

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

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        phone: phone,
        address: address,
        postalCode: postalCode,
        city: city,
        country: country,
      }),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    } else {
      console.error("Failed to save profile information.");
    }
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-xs mx-auto">
        {saved && <InfoBox>Profile Saved...</InfoBox>}
        {isSaving && <SuccessBox>Saving...</SuccessBox>}
        <div className="flex gap-4 w-[500px]">
          <ToastContainer position="top-center" reverseOrder={false} />
          <div>
            <div className="p-2 rounded-lg relative max-w-[400px]">
              {userImg && (
                <Image
                  className="w-full h-full mb-1"
                  src={userImage ? userImage : userImg}
                  width={250}
                  height={250}
                  alt={"avatar"}
                />
              )}
              {!userImage && (
                <div className="w-full h-full mb-1 bg-gray-200"></div>
              )}
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
          <form className="w-[600px]" onSubmit={handleProfileInfoUpdate}>
            <div>
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="First And Last Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <input
                type="email"
                disabled={true}
                value={session?.data?.user?.email}
              />
            </div>
            <div>
              <label htmlFor="">Phone</label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Street Address</label>
              <input
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div>
                <label htmlFor="">Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Country</label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
