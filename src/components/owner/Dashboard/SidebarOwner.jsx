import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./SidebarOwner.module.css";
import { Link } from "react-router-dom";

const SidebarOwner = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className="text-center">Owner Panel</h3>
      </div>
      <Nav className="flex-column h-100">
        <Link to="/admin/dashboard" className={styles.navLink}>
          <FaHome /> Dashboard
        </Link>
        <Link to="/admin/users" className={styles.navLink}>
          <FaUsers /> Users
        </Link>
        <Link to="/owner/building" className={styles.navLink}>
          <FaShoppingCart /> Tòa nhà
        </Link>
        <Link to="/owner/house" className={styles.navLink}>
          <FaClipboardList /> Nhà
        </Link>
        <Link to="/owner/room" className={styles.navLink}>
          <FaClipboardList /> Phòng
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

export default SidebarOwner;
