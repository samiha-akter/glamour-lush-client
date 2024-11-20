import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../authenticate/Login";
import Register from "../authenticate/Register";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import Overview from "../pages/dashboard/Overview";
import MyProducts from "../pages/dashboard/seller/MyProducts";
import AddProducts from "../pages/dashboard/seller/AddProducts";
import SellerRoute from "./private/SellerRoute";
import BuyerRoute from "./private/BuyerRoute";
import MyWishlist from "../pages/dashboard/buyer/MyWishlist";
import ProductDetails from "../components/product/ProductDetails";
import MyCart from "../pages/dashboard/buyer/MyCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
       
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/overview",
        element: <Overview />,
      },
      // buyer routes
      {
        path:"/dashboard/wishlist",
        element:<BuyerRoute><MyWishlist/></BuyerRoute>,
      },
      {
        path:"/dashboard/cart",
        element:<BuyerRoute><MyCart/></BuyerRoute>,
      },
      // seller routes
      {
        path: "/dashboard/my-products",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/add-products",
        element: (
          <SellerRoute>
            <AddProducts />
          </SellerRoute>
        ),
      },
    ],
  },
]);

export default router;