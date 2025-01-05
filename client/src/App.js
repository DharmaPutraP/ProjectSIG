import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Home,
  DetailPage,
  Dashboard,
  Login,
  Logout,
  Create,
  Edit,
  Admin,
} from "./pages";

import { action as loginAction } from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <>error woi</>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "detail",
        element: <Home />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <HomeLayout />,
    errorElement: <>error woi</>,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
