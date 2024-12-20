import { Footer } from "./Components/index";
import { Outlet } from "react-router-dom";
import { AuthCtxtProvider } from "./context/AuthContext";
import { DirectoryContextProvider } from "./context/DirectoryContext";

function App() {
  return (
    <AuthCtxtProvider>
      <DirectoryContextProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div
            style={{ flex: 1 }}
            className="dark:bg-dark bg-Light20 overflow-hidden"
          >
            <Outlet />
          </div>
          <Footer />
        </div>
      </DirectoryContextProvider>
    </AuthCtxtProvider>
  );
}

export default App;
