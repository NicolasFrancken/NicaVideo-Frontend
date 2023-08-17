import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Creators from "./pages/Creators";
import Video from "./pages/Video";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import { RequireAuth } from "react-auth-kit";

function AppRoutes() {
  if (window.location.pathname === "/") {
    return <Navigate to="/signup" />;
  }
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/videos"
        element={
          <RequireAuth loginPath="/signin">
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/creators"
        element={
          <RequireAuth loginPath="/signin">
            <Creators />
          </RequireAuth>
        }
      />
      <Route
        path="/videos/:videoId"
        element={
          <RequireAuth loginPath="/signin">
            <Video />
          </RequireAuth>
        }
      />
      <Route
        path="/profile/:creatorId"
        element={
          <RequireAuth loginPath="/signin">
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}

export default AppRoutes;
