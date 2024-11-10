import { Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { DirectoryContextProvider } from "./context/DirectoryContext";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <DirectoryContextProvider>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 dark:bg-dark bg-Light20 overflow-hidden">
            <Outlet />
          </main>
          <Footer />
        </div>
      </DirectoryContextProvider>
    </AuthContextProvider>
  );
};

export default App;
