import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./screens/root"
import { RecoilRoot } from "recoil"
import HomePage from "./screens/homePage"
import SubscriptionsPage from "./screens/subscription"
import LikedVideosPage from "./screens/liked-videos"
import TweetsPage from "./screens/tweet"
import ProfilPage from "./screens/profile"
import { VideoPage } from "./components/Videopage"
import { ChannelPage } from "./screens/channelPage"
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {path: 'video/:vid', element: <VideoPage />},
      { path: 'channel/:cid', element: <ChannelPage /> },
      {
        path: "profile",
        element: <ProfilPage/>
      },
      {
        index: true,
        element: <HomePage />
      },
      {
        path:"subscriptions",
        element: <SubscriptionsPage />
      },
      {
        path: "liked-videos",
        element: <LikedVideosPage />
      },
      {
        path: "tweets",
        element: <TweetsPage/>
      }
    ]
  },
])


export default function App() {
  return(<RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot> )
}