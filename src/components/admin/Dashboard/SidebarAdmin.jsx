import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./SidebarAdmin.module.css";

const SidebarAdmin = () => {
  return (
    <div className="sidebar bg-dark text-white">
      <div className="sidebar-header p-3 mb-3 border-bottom">
        <h3 className="text-center">Admin Panel</h3>
      </div>
      <Nav className="flex-column">
        <Nav.Link href="/admin/dashboard" className="text-white">
          <FaHome className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link href="/admin/users" className="text-white">
          <FaUsers className="me-2" /> Users
        </Nav.Link>
        <Nav.Link href="/products" className="text-white">
          <FaShoppingCart className="me-2" /> Products
        </Nav.Link>
        <Nav.Link href="/orders" className="text-white">
          <FaClipboardList className="me-2" /> Orders
        </Nav.Link>
        <Nav.Link href="/settings" className="text-white">
          <FaCog className="me-2" /> Settings
        </Nav.Link>
        <Nav.Link href="/logout" className="text-white mt-auto">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarAdmin;
