import { Header, Footer } from "./Components/index";
import { Outlet } from 'react-router-dom';
import { AuthCtxtProvider } from "./context/AuthContext";
function App() {
  
  
  return (
    <AuthCtxtProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1}} className="dark:bg-zinc-950">          
            <Outlet />
        </div>
        <Footer />
      </div>
    </AuthCtxtProvider>
  );
}

export default App;
