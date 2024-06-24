import logo from "./logo.svg";
import "./App.css";
import Youtube from "./pages/youtube/youtube";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Youtube />,
    errorElement: <div>Something went wrong ...</div>,
  },
  {
    path: "/sparky",
    element: <Youtube />,
    errorElement: <div>Something went wrong ...</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
