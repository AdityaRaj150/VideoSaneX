import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"


export default function NavBar() {
    const [selectedTab, setSelectedTab] = useState("PROFILE")
    const [isNavOpen, setIsNavOpen] = useState(true)
    const listVals = ["PROFILE", "PLAYLIST", "SUBSCRIPTIONS", "LIKES VIDEOS", "TWEETS"]
    return <nav

        className="bg-stone-800 flex flex-col items-end w-fit p-4 rounded-r h-[100vh] ">
        <div
            onClick={() => setIsNavOpen(val => !val)}
            className="flex flex-col gap-1 pb-4 cursor-pointer">
            <div className={`w-5 h-[1px] bg-white ${isNavOpen ? "rotate-45" : ""}`}></div>
            <div className={`w-5 h-[1px] bg-white ${isNavOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-5 h-[1px] bg-white ${isNavOpen ? "rotate-[-45deg] translate-y-[-9px]" : ""}`}></div>
        </div>
        <AnimatePresence>{isNavOpen && <motion.ul
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-start gap-5" >
            {listVals.map((val, ind) =>
                <List key={ind} selectedTab={selectedTab} setSelectedTab={setSelectedTab} >{val}</List>
            )}
        </motion.ul>}</AnimatePresence>
    </nav>
}

function List({ children, selectedTab, setSelectedTab }: any) {
    return (
        <li onClick={() => setSelectedTab(children)}
            className={`rounded px-6 py-1 cursor-pointer ${selectedTab === children ? "bg-yellow-400" : "bg-stone-500"}`} >
            {children}
        </li>
    )
}