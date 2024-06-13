import React, { useContext, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import { UserContext } from "../../context/AuthContext";

function Loading({ loading }) {
  const { mode } = useContext(UserContext);
  useEffect(() => {
    return mode === "dark"
      ? document.getElementById("root").classList.add("dark")
      : document.getElementById("root").classList.remove("dark");
  }, [mode]);
  return (
    <PacmanLoader
      color="#D93273"
      loading={loading}
      size={25}
      className="bg-transparent"
    />
  );
}

export default Loading;
