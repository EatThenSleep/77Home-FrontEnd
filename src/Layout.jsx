import { Route, Routes } from "react-router-dom";
import CreateNewHouse from "./components/owner/house/CreateNewHouse";
import ManageHouse from "./components/owner/house/ManageHouse";
import App from "./App";
import { Suspense } from "react";
import ListHouse from "./components/owner/house/ListHouse";
import DetailHouse from "./components/owner/house/DetailHouse";
import UpdateHouse from "./components/owner/house/UpdateHouse";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ManageBuilding from "./components/owner/building/ManageBuilding";
import CreateNewBuilding from "./components/owner/building/CreateNewBuilding";
import ListBuilding from "./components/owner/building/ListBuilding";
import DetailBuilding from "./components/owner/building/DetailBuilding";

const Layout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/house" element={<ManageHouse />}>
            <Route index element={<ListHouse />} />
            <Route path="create" element={<CreateNewHouse />} />
            <Route path="update" element={<UpdateHouse />} />
            <Route path=":id" element={<DetailHouse />} />
          </Route>
          <Route path="/building" element={<ManageBuilding />}>
            <Route index element={<ListBuilding />} />
            <Route path="create" element={<CreateNewBuilding />} />
            <Route path=":id" element={<DetailBuilding />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Layout;
