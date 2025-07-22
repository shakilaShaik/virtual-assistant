import React from "react";

import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";

const App = () => {
  return (
    <div>
      <Routers>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Routers>
    </div>
  );
};
export default App;
