import { useRecoilState } from "recoil"
import { isNavOpenAtom } from "../atom/atom"

import { ReactNode, useEffect } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        setIsNavOpen(false)
    }, [])
    const [isNavOpen, setIsNavOpen] = useRecoilState(isNavOpenAtom);
    return (
        <div className={`${isNavOpen ? "w-[85vw]" : "w-[96vw]"} h-screen flex justify-center items-center`}>
            <div className="pt-16 h-full w-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};