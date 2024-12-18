import { useNavigate } from "react-router-dom"

export const allVideos: any = [
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp11858876.png",
        length: 10,
    },
    {
        id: 2,
        title: "shidou's goal",
        views: 100,
        channel: "blue lock",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp11858876.png",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp13616845.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp11858876.png",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp13616845.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp13616845.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp13616845.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp11858876.png",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp11858876.png",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp11858876.png",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://wallpapercave.com/wp/wp13616845.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },
    {
        id: 1,
        title: "speed barking",
        views: 100,
        channel: "I show speed",
        channelLogo: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        timeUploaded: 5,
        thumbnail: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/blue-lock-chapter-209-isagi.jpg",
        length: 10,
    },

]

export const AllVideos = () => {
    return (<div className="flex flex-wrap items-start justify-center gap-12 p-12 overflow-y-scroll overflow-x-hidden h-full">
        {allVideos.map((video: any, i: number) => {
            return <Video {...video} key={i} />
        })}
    </div>)
}

export const Video = (prop: any) => {
    const navigate = useNavigate();
    const handleClick = (id: number) => {
        navigate("/video/vid="+id);
    }
    return (<div onClick={() => handleClick(prop.id)} className={`flex ${prop.type !== "row" && "flex-col"} ${prop.mini ? "w-fit h-20" : "w-60 h-48"} rounded bg-black2 hover:scale-105 duration-75 ease-linear cursor-pointer`} >
        <div className={`${prop.mini ? "h-full w-1/2" : "h-[62%]"} overflow-hidden`} >
            <img className="min-w-full min-h-full object-cover" src={prop.thumbnail} />
        </div>
        <div className={`text-slate-300 ${prop.mini ? "h-full w-1/2" : "h-[38%]"} text-sm relative`} >
            <div className="flex justify-start h-full gap-2 p-2">
                <ChannelLogo mini={prop.mini} channelLogo={prop.channelLogo} channel={prop.channel}/>
                <div className="flex flex-col justify-between h-full">
                    <p >{prop.title}</p>
                    <div className="flex flex-col text-xs opacity-75" >
                        <p>{prop.channel}</p>
                        <p>{prop.timeUploaded} days ago</p>
                    </div>
                </div>
            </div>
            <div className={`absolute ${prop.mini ? "bottom-1 left-[-5rem]" : "top-[-1.8rem] right-1"} border-2 border-black4 text-xs py-1 px-2 bg-black2 rounded`} >{prop.views} views</div>
        </div>
    </div>)
}

export const ChannelLogo = ({mini = false, channelLogo, channel}: {mini: boolean, channelLogo: string, channel:string}) => {
    const navigate = useNavigate()
    return (<>
        {!mini && <img onClick={() => navigate(`/channel/cid=${channel}`)} className="aspect-square cursor-pointer hover:scale-110 duration-75 ease-linear h-8 border border-black4 rounded-full" src={channelLogo} />}</>)
}
 