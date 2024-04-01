import { CornerUpRight } from "lucide-react";

const MessageInput = () => {
    return (
        <div className=" w-[100dvw] fixed bottom-0 flex justify-center items-center z-[100] bg-backgroundLight py-4">
            <div className="flex grow relative">

                <input
                    className=" flex grow mx-2 rounded-xl h-10 p-6 accent-black bg-backgroundMedium um border-background border-2 focus:border-black outline-none transition-[0.5s]"
                />
                {/* <button className="absolute h-5 w-5 flex justify-center items-center bg-white rounded-lg right-5 top-2">G</button> */}
                <CornerUpRight className="absolute h-8 w-8 p-1 flex justify-center items-center bg-main rounded-lg right-5 top-3 cursor-pointer  hover:bg-[#909ee1] transition-[0.5s]" />
            </div>
            {/* use shadcnui textbox?? */}
            {/* <span className="flex grow mx-2 rounded-xl h-10 p-2 absolute w-full"  role="textbox" contentEditable>99</span>wd */}
        </div>
    );
}

export default MessageInput;