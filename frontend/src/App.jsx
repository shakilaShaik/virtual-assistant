import React from "react";

import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import Customize from "./pages/Customize";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { api,baseUrl } from "./common/api";


// const [user, setUser] = useState(null)

const App = () => {



  
const handleUserData = async () => {
  try {
    const result = await axios({
      method: api.method,
      url: `${baseUrl}/${api.getUser.url}`,
    });
    // setUser(result.data.)
    console.log("user result is ", result);
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
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/customize" element={<Customize />} />
        </Routes>
      </Routers>
    </div>
  );
};
export default App;
