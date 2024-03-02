"use client";
import React, { useState } from "react";
import EditableImage from "./EditableImage";
import { ToastContainer } from "react-toastify";
import useProfile from "../UseProfile";

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [image, setImage] = useState(user?.image || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();
  return (
    <div>
      <div className="flex gap-4 w-[500px]">
        <ToastContainer position="top-center" reverseOrder={false} />
        <div>
          <div className="p-2 rounded-lg relative max-w-[400px]">
            <EditableImage link={image} setLink={setImage} />
          </div>
        </div>
        <form
          className="w-[600px]"
          onSubmit={(ev) =>
            onSave(ev, {
              name: userName,
              phone,
              address,
              postalCode,
              city,
              country,
              image,
              admin
            })
          }
        >
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
            <input type="email" disabled={true} value={user.email} />
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
            {loggedInUserData.admin && (
              <div>
                <label
                  className="p-2 inline-flex items-center gap-2 mb-2"
                  htmlFor="adminCb"
                >
                  <input
                    id="adminCb"
                    type="checkbox"
                    className=""
                    value={"1"}
                    checked={admin}
                    onChange={(ev) => setAdmin(ev.target.checked)}
                  />
                  <span>Admin</span>
                </label>
              </div>
            )}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
