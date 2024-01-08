import { Header, Footer } from "./Components/index";
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1, padding: '20px' }} className="dark:[#030025] dark:bg-[#030025]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
