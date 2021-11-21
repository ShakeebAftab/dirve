import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/SignUp";

export const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate replace to="/home" />
          ) : (
            <Navigate replace to="/signin" />
          )
        }
      />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate replace to="/" />}
      />
      <Route
        path="/signin"
        element={user ? <Navigate replace to="/" /> : <Auth />}
      />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
    </Routes>
  );
};
