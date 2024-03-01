import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../app/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditableImage = ({ link, setLink }) => {
  const [key, setKey] = useState(0);

  const handleFileChange = async (e) => {
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
          toast("Upload complete... Reload to see the changes properly.", {
            icon: "🎉",
          });
          const downloadURL = await getDownloadURL(storageRef);
          setLink(downloadURL);
          console.log(downloadURL);
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
      setLink("");
    }
  };

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [link]);

  return (
    <>
      {!link && (
        <Image
          key={key}
          className="mb-1"
          priority={true}
          src={link}
          width={50}
          height={50}
          alt={"No Image.."}
        />
      )}
      {link && (
        <Image
          key={key}
          className="w-full h-full mb-1"
          priority={true}
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}
      {!link && <div className="w-full h-full mb-1 bg-gray-200"></div>}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 cursor-pointer rounded-lg p-2 text-center">
          Edit
        </span>
      </label>
    </>
  );
};

export default EditableImage;
