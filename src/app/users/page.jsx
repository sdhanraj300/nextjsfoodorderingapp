"use client";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Fetching data from the server
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        // Setting the data to the state
        setUsers(data);
      });
  }, []);

  const { loading, data } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (!data.admin) return <div>Access Denied</div>;

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name ? (
                    <span>{user.name}</span>
                  ) : (
                    <span className="italic">No name</span>
                  )}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={`users/${user._id}`}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
