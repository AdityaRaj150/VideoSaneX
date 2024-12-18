import { ChannelLogo } from "../components/allVideos"
import { SubscribeButton } from "../components/Videopage"
import { Wrapper } from "../components/wrapperForNavChanges"

export const ChannelPage = () => {
    
    return (
      <Wrapper>
        <div className="flex flex-col w-full h-full">
                <div className="w-full h-[30%] bg-black1 overflow-hidden">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQj4XaWZQUD1GiJaCKt7dLVCBsG1Fa9-v4WQ&s" 
                    className="min-w-full min-h-full"
                    />
                </div>
                <div className="w-full h-[30%] flex">
                    <div className="flex flex-col h-full w-[30%]">
                        {/* <ChannelLogo mini={false} channel="blue lock" channelLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQj4XaWZQUD1GiJaCKt7dLVCBsG1Fa9-v4WQ&s" /> */}
                        <h1>blue lock</h1>
                        <p>100k subscribers</p>
                        <SubscribeButton />
                    </div>
                    <div className="w-[70%] h-full">
                        about me descriptionsdafsadf
                    </div>
                </div>
                <div className="w-full h-1/2 bg-black2">content</div>
        </div>
      
      </Wrapper>
    )
}