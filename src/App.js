import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from "react-loader-spinner";

import AppRoutes from "./routes/AppRoutes";
import NavHeader from "./components/navigation/NavHeader";
import { useAuth } from "../src/context/AuthContext";

function App() {
  const userContext = useAuth().user;

  return (
    <Router>
      {userContext && userContext.loading ? (
        <div className="app-loading-container">
          <Rings heigth="100" width="100" color="#1877f2" ariaLabel="loading" />
          <div>loading data....</div>
        </div>
      ) : (
        <>
          <div className="app-nav">
            <NavHeader />
          </div>
          <div className="app-container">
            <AppRoutes />
          </div>{" "}
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        className="toast-container"
      />
    </Router>
  );
}

export default App;
