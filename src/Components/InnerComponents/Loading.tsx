import React, { useContext, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import { UserContext } from "../../context/AuthContext";

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  const context = useContext(UserContext);
  const mode = context?.mode;

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (!rootElement) return;
    
    rootElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <PacmanLoader
      color="#D93273"
      loading={loading}
      size={25}
      className="bg-transparent"
    />
  );
};

export default Loading;
