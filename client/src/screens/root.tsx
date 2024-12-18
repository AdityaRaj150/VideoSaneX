import { Outlet } from "react-router";
import NavBar from "../components/navbar";
import { TopBar } from "../components/topbar";

export default function RootLayout(){
    return<div className="w-screen text-slate-200 h-screen flex">
    <NavBar />
    <TopBar />
    <Outlet />
    </div>
}