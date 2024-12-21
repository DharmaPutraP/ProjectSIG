import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, Home, DetailPage, Dashboard } from "./pages";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
