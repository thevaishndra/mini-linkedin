// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import HomePage from "./pages/HomePage";
// import ProfilePage from "./pages/ProfilePage";

import React, {useEffect, useState} from "react";
import {BrowserRouter as Routes, Route, Navigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {LoaderCircle} from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin text-primary" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Routes>
        <Toaster position="top-center" reverseOrder={false} />
        <Route>
          {/* Public Routes */}
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:id"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />

          {/* Catch-all Route */}
          <Route
            path="*"
            element={<Navigate to={authUser ? "/" : "/login"} />}
          />
        </Route>
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App