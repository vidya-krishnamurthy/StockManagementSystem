import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from 'react-router-dom';
import '../styles/global.css';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: '100%' }}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
