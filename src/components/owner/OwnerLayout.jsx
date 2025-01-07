import { Outlet } from "react-router-dom";
import styles from "./OwnerLayout.module.css";
import SidebarOwner from "./Dashboard/SidebarOwner";
const OwnerLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <SidebarOwner />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerLayout;
