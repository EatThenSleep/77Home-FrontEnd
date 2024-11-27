import { Route, Routes } from "react-router-dom";
import CreateNewHouse from "./components/owner/CreateNewHouse";
import ManageHouse from "./components/owner/ManageHouse";
import App from "./App";
import { Suspense } from "react";
import ListHouse from "./components/owner/ListHouse";
import Login from "./components/user/Login";
const Layout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/house" element={<ManageHouse />}>
            <Route index element={<ListHouse />} />
            <Route path="create" element={<CreateNewHouse />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Layout;
