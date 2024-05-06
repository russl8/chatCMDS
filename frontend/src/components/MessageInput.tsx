import { CornerUpRight } from "lucide-react";
import React from "react";
import ResetButton from "./ResetButton";
interface MessageInputProps {
    messages: any;
    setMessages: any;
    startGame: any;
}

const MessageInput = ({ messages, setMessages, startGame }: MessageInputProps) => {
    const [text, setText] = React.useState<string>("");
    const aiFormat = (messages: any) => {
        let role: string = "";
        let res: any[] = [];
        messages.forEach((msg: any) => {
            role = (msg.userName === "ChatCMDS") ? "system" : "user"
            res.push({ 'role': role, "content": msg.message })
        })
        return JSON.stringify(res);
    }
    const saveMsgToLocalStorage = (newMsg: any) => {
        let messages = JSON.parse(localStorage.getItem("messages") || '""');
        if (messages == null) messages = [];
        localStorage.setItem("messages", JSON.stringify([...messages, newMsg]));
    }
    const sendMessage = (e: any) => {
        const msg = {
            username: "You",
            time: Date(),
            message: text,
        }
        e.preventDefault();
        if (text.length < 1) {
            alert("Please enter a valid message!")
            return;
        }
        messages.push(msg)
        setMessages([...messages])
        //add user msg to localstorage
        saveMsgToLocalStorage(msg)
        //create formData
        const formData = new FormData();
        // formData.append("prompt", text);
        formData.append("existingMessages", aiFormat(messages))
        console.log("send message. all messages: "+ messages.length)
        fetch('https://chatcmds.onrender.com/predict', {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then((data) => {
                setMessages([
                    ...messages,
                    {
                        username: "ChatCMDS",
                        time: Date(),
                        message: data.result,
                    }
                ])

                saveMsgToLocalStorage({
                    username: "ChatCMDS",
                    time: Date(),
                    message: data.result,
                })
            })
            .catch(error => console.error(error))
        setText("");
    }
    return (
        <form
            onSubmit={sendMessage}
            className=" w-[100dvw] fixed bottom-0 flex justify-center items-center z-[100] bg-backgroundLight py-4">
            <div className="flex grow relative">
                <input
                    className=" flex grow mx-2 rounded-xl h-10 p-6 accent-black bg-backgroundMedium um border-background border-2 focus:border-black outline-none transition-[0.5s]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <ResetButton
                    setMessages={setMessages}
                    startGame={startGame}
                    messages={messages}
                />

                <CornerUpRight
                    className="absolute h-8 w-8 p-1 flex justify-center items-center bg-main rounded-lg right-5 top-3 cursor-pointer  hover:bg-[#909ee1] transition-[0.5s]"
                    onClick={sendMessage}
                    type="submit"
                />
            </div>
        </form>
    );
}

export default MessageInput;