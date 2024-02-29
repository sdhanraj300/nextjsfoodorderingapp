import UserTabs from "@/components/layout/UserTabs";
import React from "react";

const MenuItemsPage = () => {
  return (
    <section>
      <UserTabs isAdmin={true} />
    </section>
  );
};

export default MenuItemsPage;
