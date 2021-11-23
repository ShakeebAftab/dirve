import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
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
        element={user ? <Navigate replace to="/" /> : <SignIn />}
      />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
    </Routes>
  );
};
