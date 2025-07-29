import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import Customize from "./pages/Customize";
import { useEffect } from "react";
import axios from "axios";
import { api, baseUrl } from "./common/api";
import { UserContext } from "./context/UserContext";
import Customize2 from "./pages/Customize2";
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
      // console.log("user  is ", user);
    } catch (error) {
      console.log("error from user data", error);
    }
  };

  useEffect(() => {
    handleUserData();
    console.log(user);
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to={"/signin"} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/customize2" element={<Customize2 />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
