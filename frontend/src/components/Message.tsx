import { CircleUserRound } from "lucide-react";
interface MessageProps {
    username: string;
    time: string;
    message: string;
}
const Message = ({ username, time, message }: MessageProps) => {
    return (
        <div className="bg-backgroundMedium px-20 py-4 mt-2 ">
            <div className="flex flex-row items-start">
                <div className="mr-4">
                    <CircleUserRound className="h-10 w-10" />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row text-center items-center">
                        <p className="font-bold text-sm mr-2">{username}</p>
                        <p className="text-sm font-thin">{time}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className = "text-sm">
                        {message}
                        </p>
                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Message;