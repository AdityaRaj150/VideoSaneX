import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {User, Bell,Twitter,Home,ThumbsUp} from "lucide-react"
import { useRecoilState, useRecoilValue } from "recoil"
import { isNavOpenAtom } from "../atom/atom"
import { useLocation, useNavigate } from "react-router-dom"

const listVals = ["HOME", "PROFILE", "SUBSCRIPTIONS", "LIKED VIDEOS", "TWEETS"]
enum RouteVals {
    home = '/',
    profile = "/profile",
    subscriptons = '/Subscriptions',
    likedVideos = '/liked-videos',
    tweets = '/tweets'
}

const getSelectTabInitialValue = (pathname: string) => {
    switch(pathname){
        case RouteVals.home:
            return listVals[0]
        case RouteVals.profile:
            return listVals[1]
        case RouteVals.subscriptons:
            return listVals[2]
        case RouteVals.likedVideos:
            return listVals[3]
        case RouteVals.tweets:
            return listVals[4]
        default:
            return "" 
    }
}
export default function NavBar() {
    
    
    const [isNavOpen, setIsNavOpen] = useRecoilState(isNavOpenAtom)

    return <nav

        className={`bg-black3 flex flex-col ${isNavOpen? "w-[15vw]": "w-[4vw]"} pt-20 gap-6 rounded-r h-[100vh] items-center `}>
        <div
            onClick={() => setIsNavOpen(val => !val)}
            className="flex flex-col gap-1 hover:bg-stone-black1 px-4 pt-6 pb-4 rounded cursor-pointer">
            <div className={`w-5 h-[1px] bg-white ${isNavOpen ? "rotate-45" : ""}`}></div>
            <div className={`w-5 h-[1px] bg-white ${isNavOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-5 h-[1px] bg-white ${isNavOpen ? "rotate-[-45deg] translate-y-[-9px]" : ""}`}></div>
        </div>
        <motion.ul
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col w-full justify-start gap-8" >
            {listVals.map((val, ind) =>
                <List key={ind} >{val}</List>
            )}
        </motion.ul>
    </nav>
}

function List({ children }: { children: string }) {
    const location = useLocation();
 
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState(getSelectTabInitialValue(location.pathname))

    useEffect(() => {
        setSelectedTab(getSelectTabInitialValue(location.pathname));
    }, [location.pathname]);
    let content = <p className="text-center " >{children}</p>
    const isNavOpen = useRecoilValue(isNavOpenAtom)
    if (!isNavOpen) {
        switch (children) {

            case "PROFILE":
                content = <User className="mx-auto" />
                break;
            case "HOME":
                content = <Home className="mx-auto" />
                break;
            case "SUBSCRIPTIONS":
                content = <Bell className="mx-auto" />
                break;
            case "LIKED VIDEOS":
                content = <ThumbsUp className="mx-auto" />
                break;
            case "TWEETS":
                content = <Twitter className="mx-auto" />
                break;
            default:
                content = <p className="text-center text-white">{children}</p>
        }
    }
    else{
        switch (children) {

            case "PROFILE":
                content = <span className="flex justify-start items-center gap-1 px-1" >
                    <span><User className="mx-auto" /></span>
                    <p className="text-center" >{children}</p>
                </span>
                break;
            case "HOME":
                content = <span className="flex justify-start items-center gap-1 px-1" >
                    <span><Home className="mx-auto" /></span>
                    <p className="text-center " >{children}</p>
                </span>
                break;
            case "SUBSCRIPTIONS":
                content = <span className="flex justify-start items-center gap-1 px-1" >
                    <span><Bell className="mx-auto" /></span>
                    <p className="text-center " >{children}</p>
                </span>
                break;
            case "LIKED VIDEOS":
                content = <span className="flex justify-start items-center gap-1 px-1" >
                    <span><ThumbsUp className="mx-auto" /></span>
                    <p className="text-center " >{children}</p>
                </span>
                break;
            case "TWEETS":
                content = <span className="flex justify-start items-center gap-1 px-1" >
                    <span><Twitter className="mx-auto" /></span>
                    <p className="text-center " >{children}</p>
                </span>
                break;   
        }
    }

    const goToNewPage = (route: string) => {
        
        switch(route){
            case listVals[0]:
                navigate(RouteVals.home)
                break
            case listVals[1]:
                navigate(RouteVals.profile)
                break
            case listVals[2]:
                navigate(RouteVals.subscriptons)
                break
            case listVals[3]:
                navigate(RouteVals.likedVideos)
                break
            default:
                navigate(RouteVals.tweets)
        }
    }
 
    return (
        <li onClick={() => goToNewPage(children)}
            className={`${isNavOpen? "rounded py-2": "rounded-full aspect-square flex justify-center items-center"} w-[85%] m-auto text-sm cursor-pointer ${selectedTab === children ? "bg-purple2" : "bg-black0 hover:bg-light"}`} >
            {content}
        </li>
    )
}

