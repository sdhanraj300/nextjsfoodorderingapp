"use client";

import React, { useEffect } from "react";

const useProfile = () => {
  const [data, setData] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(true); 
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return { data, loading };
};

export default useProfile;
