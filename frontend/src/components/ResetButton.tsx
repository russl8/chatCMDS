import { GrPowerReset } from "react-icons/gr";


interface props {
    setMessages:any;
    startGame:any;
    messages:any
}
const ResetButton = ({setMessages,startGame,messages}:props) => {
    return (
        <div className="h-8 absolute right-16 top-1 flex flex-row space-between rounded-xl cursor-pointer bg-black p-2 justify-center items-center mt-2 px-3  hover:bg-[#4c1b1b] transition-[0.5s]"
        onClick={()=>{
            setMessages([])
            localStorage.removeItem("messages");
            startGame(setMessages,messages)
            // // eslint-disable-next-line no-restricted-globals
            // location.reload();
        }}>
            <div className="text-lg mr-2 font-bold">
                Reset Conversation
            </div>
            <div className="text-white text-xl">
                <GrPowerReset />
            </div>
        </div>
    );
}

export default ResetButton;