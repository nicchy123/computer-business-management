import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../components/layout/MainLayout";
import Computers from "../pages/Computers";
import ProtectedRoute from "./ProtectedRoute";
import Sales from "../pages/Sales";
import Orders from "../pages/Orders";
import Create from "../pages/Create";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Computers />,
      },
      {
        path: '/sales',
        element: <Sales />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/create',
        element: <Create />,
      },
      {
        path: '/details/:id',
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
