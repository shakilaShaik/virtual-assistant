import React, { useContext } from "react";

import { BrowserRouter as Routers, Routes, Route,Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import Customize from "./pages/Customize";
import { useEffect } from "react";
import axios from "axios";
import { api, baseUrl } from "./common/api";
import { UserContext } from "./context/UserContext";
// const [user, setUser] = useState(null)


const App = () => {
  const { user, setUser } = useContext(UserContext);

  const handleUserData = async () => {
    try {
      const result = await axios({
        method: api.method,
        url: `${baseUrl}/${api.getUser.url}`,
        withCredentials: true,
      });
      setUser(result.data.user);
      console.log("user  is ", user);
    } catch (error) {
      console.log("error from user data", error);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);
  return (
    <div>
      <Routers>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/customize"} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/customize" element={<Customize />} />
        </Routes>
      </Routers>
    </div>
  );
};
export default App;
