import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./SidebarAdmin.module.css";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className="text-center">Admin Panel</h3>
      </div>
      <Nav className="flex-column h-100">
        <Link to="/admin/dashboard" className={styles.navLink}>
          <FaHome /> Dashboard
        </Link>
        <Link to="/admin/users" className={styles.navLink}>
          <FaUsers /> Users
        </Link>
        <Link to="/products" className={styles.navLink}>
          <FaShoppingCart /> Products
        </Link>
        <Link to="/orders" className={styles.navLink}>
          <FaClipboardList /> Orders
        </Link>
        <Link to="/settings" className={styles.navLink}>
          <FaCog /> Settings
        </Link>
        <Link to="/logout" className={`${styles.navLink} ${styles.logoutLink}`}>
          <FaSignOutAlt /> Logout
        </Link>
      </Nav>
    </div>
  );
};

export default SidebarAdmin;
