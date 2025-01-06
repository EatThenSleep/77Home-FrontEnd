import { Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import SidebarAdmin from "./Dashboard/SidebarAdmin";
const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <SidebarAdmin />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
