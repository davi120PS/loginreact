import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/dashboard", element: 
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  },
]);