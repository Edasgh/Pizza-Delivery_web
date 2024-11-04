import {
  createBrowserRouter,
  /*This is the recommended router for all React Router web projects. It uses the DOM(Document Object Model) History API to update the URL and manage the history stack.
It also enables the v6.4 data APIs like loaders, actions, fetchers and more. */
  RouterProvider,
  /*All data router objects are passed to this component to render your app and enable the rest of the data APIs. */
  Outlet,
  /* An '<Outlet>' should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route. */
  // Route ,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/Dashboard/AddProduct/AddProduct";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import ProfileNav from "./pages/Dashboard/ProfileNav/ProfileNav";
import Profile from "./pages/Dashboard/Profile/Profile";
import Cart from "./pages/Dashboard/Cart/Cart";
import Orders from "./pages/Dashboard/Orders/Orders";
import Edit_Product from "./pages/Dashboard/Edit_Product/Edit_Product";
import View_Products from "./pages/Dashboard/View_Products/View_Products";
import Edit_Details from "./pages/Dashboard/Edit_Details/Edit_Details";
import Change_password from "./pages/Dashboard/Edit_Details/Change_password";
import ForgotPassword from "./components/Auth/Login/ForgotPassword";
import CustomPizza from "./pages/CustomPizza/CustomPizza";
import PaymentSuccess from "./components/paymentSuccess/PaymentSuccess";
import PaymentFailed from "./components/paymentFailed/PaymentFailed";
import Notifications from "./pages/Dashboard/Notifications/Notifications";
import About from "./pages/About/About";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const DashboardLayOut=()=>{
  return(
    <>
    <div className="profile-div flex-container">
      <ProfileNav/>
        <div className="profile-div-content">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //the Layout function is passed here as an element (that function is created to return a layout )
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/:productId/product",
        element: <Product />
      },
      {
        path: "/custom_pizza",
        element: <CustomPizza />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/forgot_password",
        element: <ForgotPassword />
      },
     
      {
        path: "/profile_dashboard",
        element: <DashboardLayOut/> ,
        children:[
          {
            path:"",
            element:<Profile/>
          },
          {
            path:"/profile_dashboard/notifications",
            element:<Notifications/>
          },
          {
            path:"/profile_dashboard/:userId/edit_details",
            element:<Edit_Details/>
          },
          {
            path:"/profile_dashboard/:userId/change_password",
            element:<Change_password/>
          },
          {
            path:"/profile_dashboard/cart",
            element:<Cart/>
          },
          {
            path:"/profile_dashboard/orders",
            element:<Orders/>
          },
          {
            path:"/profile_dashboard/add_product",
            element:<AddProduct/>
          },
          {
            path:"/profile_dashboard/view_products",
            element:<View_Products/>
          },
          {
            path:"/profile_dashboard/:productId/edit_product",
            element:<Edit_Product/>
          },
        ]
      },{
        path:"/change_password",
        element:<Change_password/>
      },
      {
        path:"/paymentsuccess",
        element:<PaymentSuccess/>
      },
      {
        path:"/paymentfailure",
        element:<PaymentFailed/>
      },
    ],
  },
]);


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
