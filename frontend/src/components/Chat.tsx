import Message from "./Message";
import MessageInput from "./MessageInput";

const Chat = () => {
    return (
        <div className="min-h-[100dvh] h-auto bg-backgroundLight pt-12">

                        <Message/>


            <MessageInput/>
        </div>
    );
}

export default Chat;