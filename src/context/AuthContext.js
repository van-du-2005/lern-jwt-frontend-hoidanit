import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";
import { useHistory } from "react-router-dom";

// Tạo Context
const AuthContext = createContext(null);
// Tạo Provider component
const AuthProvider = ({ children }) => {
  const history = useHistory();
  const userDefault = {
    loading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(userDefault);

  // Hàm đăng nhập giả lập
  const login = (userData) => {
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser({...userDefault, loading: false });
    localStorage.removeItem("jwt");
  };

  const fetchUserAccount = async () => {
    let response = await getUserAccount();
    if (response && +response.EC === 0) {
      const email = response.DT.email;
      const userName = response.DT.username;
      const groupWithRoles = response.DT.groupWithRoles;
      const token = response.DT.accessToken;
      const data = {
        loading: false,
        isAuthenticated: true,
        token: "fake token",
        account: {
          email: email,
          userName: userName,
          groupWithRoles: groupWithRoles,
          token: token,
        },
      };
      setUser(data);
    } else {
      setUser((userData) => {
        return { userData, loading: false };
      });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/"
    ) {
      fetchUserAccount();
    } else {
      setUser((userData) => {
        return { userData, loading: false };
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
// Custom hook để dùng nhanh AuthContext
export { useAuth, AuthProvider };
