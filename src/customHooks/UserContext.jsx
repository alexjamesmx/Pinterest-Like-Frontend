import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLocalStorage, setUserLocalStorage] = useState(
    JSON.parse(localStorage.getItem("authState")) || null
  );
  const [userRefresh, setUserRefresh] = useState(false);
  const [userCategories, setUserCategories] = useState([]);

  const getUserFromMongo = useCallback(() => {
    if (!userLocalStorage) {
      return null;
    }
    axios
      .get(process.env.REACT_APP_BACK_API + "/users/" + userLocalStorage._id)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setUserCategories(res.data.categories);
          localStorage.setItem("authState", JSON.stringify(res.data));
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error("Error getting user: ", error);
      });
  }, [userLocalStorage]);

  //HANDLE LOGIN or SIGNUP
  useEffect(() => {
    getUserFromMongo();
  }, [userRefresh, getUserFromMongo]);

  const logout = () => {
    localStorage.removeItem("authState");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userLocalStorage,
        setUserLocalStorage,
        userRefresh,
        setUserRefresh,
        logout,
        userCategories,
        setUserCategories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { UserContext, UserProvider };
