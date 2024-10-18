import { Outlet } from "react-router";
import NavBar from "../components/navbar";

export default function RootLayout(){
    return<>
    <NavBar />
    <Outlet />
    </>
}