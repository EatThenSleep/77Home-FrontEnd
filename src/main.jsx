import { createRoot } from "react-dom/client";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>

  // </StrictMode>
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
