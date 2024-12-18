import { useLocation } from "react-router-dom";
import {  useState } from "react";
import { allVideos, ChannelLogo } from "./allVideos";
import { Video } from "./allVideos";
import { AnimatePresence, motion } from "framer-motion";
import { Wrapper } from "./wrapperForNavChanges";

const videoarr: { [key: string]: { id: number; title: string; views: number; channel: string; channelLogo: string; timeUploaded: number; thumbnail: string; length: number; } } = {
    '1': {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },  
    '2': {
        id: 1,
        title: "shidou's goal",
        views: 100,
        channel: "blue lock",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },  
               
}

export const VideoPage = () => {
    
    const location = useLocation();
    const path = location.pathname.split('/')[2]
    const vid = path.slice(4,path.length);
    const videoDetail = videoarr[vid]
  
    return (
       <Wrapper>
                <div className="w-[70%] justify-center h-full items-center flex flex-col py-10" >
                    <div className="w-[80%] h-[70%] rounded bg-black1 overflow-hidden" >
                        <img className="w-full h-full object-cover" src={videoDetail.thumbnail} />
                    </div>
                    <div className="w-[80%] h-[15%] p-2 flex flex-col gap-2" >
                        <div>{videoDetail.title}</div>
                        <div className="flex gap-4">
                            <ChannelLogo channel={videoDetail.channel} mini={false} channelLogo={videoDetail.channelLogo} />
                            <div className="flex flex-col opacity-90 text-xs ">
                                <p>{videoDetail.channel}</p>
                                <p>100k subscribers</p>
                            </div>
                          <SubscribeButton />
                        </div>
                    </div>

                </div>
                <div className="flex flex-col h-[95%] w-[30%] bg-black1 rounded p-2" >
                    <p className="p-2" >Watch More Videos</p>
                    <div className="flex flex-col overflow-y-scroll overflow-x-hidden gap-6 px-2">
                        {allVideos.map((video: any, i: number) => <Video key={i} {...video} type="row" mini={true} />)}
                    </div>
                </div>
       </Wrapper>
    )
}


export const SubscribeButton = () => {

    const [subscribed, setSubscribed] = useState(false)
    return (<button onClick={() => setSubscribed((prev: any) => !prev)} className="h-9 overflow-hidden w-32 text-center rounded-full bg-red px-4 ease-linear duration-75 active:scale-95" >
        <AnimatePresence mode="wait">
            {subscribed ? (
                <motion.p
                    key="subscribe"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    Subscribe
                </motion.p>
            ) : (
                <motion.p
                    key="unsubscribe"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    Unsubscribe
                </motion.p>
            )}
        </AnimatePresence>
    </button>)
}

