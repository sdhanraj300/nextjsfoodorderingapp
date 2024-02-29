"use client";
import UserTabs from "@/components/layout/UserTabs";
import React, { useEffect } from "react";
import useProfile from "../../components/UseProfile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoriesPage = () => {
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) {
        resolve(response);
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      pending: editedCategory ? "Updating Category..." : "Creating Category...",
      success: editedCategory ? "Updated Category" : "Category Created",
      error: editedCategory
        ? "Error Updating Category"
        : "Error Creating Category",
    });
  };

  const [categoryName, setCategoryName] = React.useState("");
  const { data: profileData, loading: profileLoading } = useProfile();
  const [categories, setCategories] = React.useState([]);
  const [editedCategory, setEditedCategory] = React.useState(false);
  if (profileLoading) return <div>Loading...</div>;
  if (!profileData.admin) return <div>Not an Admin</div>;
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form action="" className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label htmlFor="">
              {editedCategory ? "Update Category" : "New Category"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit Category : </h2>
        {categories.map(
          (category) =>
            categories.length > 0 && (
              <button
                onClick={() => {
                  setEditedCategory(category);
                  setCategoryName(category.name);
                }}
                key={category._id}
                className="bg-gray-200 rounded-xl p-2 px-4 mb-1 flex gap-1 cursor-pointer"
              >
                <span>{category.name}</span>
              </button>
            )
        )}
      </div>
    </section>
  );
};

export default CategoriesPage;
