import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./screens/root"
import Profile from "./screens/profile"
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "profile",
        element: <Profile/>
      },
      {
        index: true,
        element: <h1>homepage</h1>
      }
    ]
  },
])


export default function App() {
  return(<RouterProvider router={router} />)
}