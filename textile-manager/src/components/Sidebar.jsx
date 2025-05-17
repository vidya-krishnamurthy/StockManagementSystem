import { NavLink } from 'react-router-dom';
import { FaYarn, FaTshirt, FaChartLine, FaUsers, FaUserFriends } from 'react-icons/fa';
import '../styles/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Textile Manager</h2>
      <NavLink to="/dashboard/yarn">
        <FaYarn /> Yarn Inventory
      </NavLink>
      <NavLink to="/dashboard/dothi">
        <FaTshirt /> Dhoti Production
      </NavLink>
      <NavLink to="/dashboard/sales">
        <FaChartLine /> Sales Management
      </NavLink>
      <NavLink to="/dashboard/suppliers">
        <FaUsers /> Suppliers
      </NavLink>
      <NavLink to="/dashboard/employees">
        <FaUserFriends /> Employee Management
      </NavLink>
    </div>
  );
};

export default Sidebar;