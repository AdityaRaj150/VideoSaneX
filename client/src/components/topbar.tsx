import {Search} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export const TopBar = () => {
    const navigate = useNavigate()
    return(<div className="bg-black3 z-50 w-screen h-16 fixed top-0 left-0 flex justify-center items-center">
        <span onClick={() => navigate('/')} className="cursor-pointer hover:scale-110 ease-linear duration-75 absolute h-full rounded left-6 flex justify-center items-center" >
            <img src="https://imgs.search.brave.com/Rt-Id-AejgMrU03hVRop8Kv3aQq9kJsg2uMLBuC--LU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1NDAu/cG5n"
            className="w-full h-1/2"
            />
        </span>
        <span className='bg-black1 text-center rounded-full w-1/4 px-2 h-10 flex justify-between focus-within:border focus-within:border-slate-500' >
            <input className="bg-transparent focus:outline-none text-center rounded-full h-full w-[90%]" placeholder="search here" />
            <span className='w-[10%] h-full flex justify-center items-center hover:scale-125 cursor-pointer duration-75 ease-linear' ><Search /></span>
        </span>
 
    </div>)
}