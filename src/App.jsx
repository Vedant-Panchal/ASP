import { Header, Footer } from "./Components/index";
import { Outlet } from 'react-router-dom';
import { AuthCtxtProvider } from "./context/AuthContext";


function App() {

  return (
    <AuthCtxtProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="bg-transparent">
        <Header />
        <div style={{ flex: 1, padding: '20px' }} className="dark:[#030025] dark:bg-[#030025]">          
            <Outlet />

        </div>
        <Footer />
      </div>
    </AuthCtxtProvider>
  );
}

export default App;
