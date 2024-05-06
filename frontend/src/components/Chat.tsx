import React, { useRef, useEffect } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

const Chat = () => {
    const [messages, setMessages] = React.useState<Array<{
        username: string,
        message: string,
        time: string,
    }>>(trainedMessages);

    // useEffect(() => {
    //     startGame(setMessages)
    // }, [])

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    return (
        <div className="min-h-[100dvh] h-auto bg-backgroundLight pt-12 pb-20">
            <div className="[overflow-anchor:none]">
                <Message
                    message={"In a way, screen-based applications govern the way I spend my time. By being a means of communication with friends and family, and a source of entertainment and learning, I definitely cannot see myself living a life without screens anytime soon. ChatCMDS will take it from here, and will assess how much screen-based media affects YOUR life, as you walk through a screenfast simulation. START THE GAME BY PRESSING 'RESET CONVERSATION'"}
                    username={"Russell :) "}
                    time={Date()}
                />
                {messages.length !== 0 &&

                    messages.map((msg, index) =>
                        index >= 12 &&
                        <Message
                            message={msg.message}
                            username={msg.username}
                            time={msg.time}
                            key={index}
                        />
                    )
                }
                <div ref={messagesEndRef}></div>
            </div>
            <MessageInput messages={messages} setMessages={setMessages} startGame={startGame} />
        </div>
    );
}

const startGame = (setMessages: any, messages: any) => {
    let m = fetchMessagesFromLocalStorage()

    if (m === ""
    ) {
        const formData = new FormData();
        for (const msg of trainedMessages) {
            saveMsgToLocalStorage(msg)
        }
        formData.append("existingMessages", aiFormat(trainedMessages))
        console.log("1:" + messages.length + "  " + trainedMessages.length)
        fetch('http://127.0.0.1:5000/predict', {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then((data) => {
                setMessages([
                    ...messages,
                    {
                        username: "ChatCMDS",
                        time: Date(),
                        message: data.result
                    }
                ])

                saveMsgToLocalStorage({
                    username: "ChatCMDS",
                    time: Date(),
                    message: data.result
                })
            })
            .catch(error => console.error(error))
    }
    else setMessages(messages)
}

const fetchMessagesFromLocalStorage = () => {
    let messages = JSON.parse(localStorage.getItem("messages") || '""');
    return messages;
}
const saveMsgToLocalStorage = (newMsg: any) => {
    let messages = JSON.parse(localStorage.getItem("messages") || '""');
    if (messages == null) messages = [];
    localStorage.setItem("messages", JSON.stringify([...messages, newMsg]));
}
const aiFormat = (messages: any) => {
    let role: string = "";
    let res: any[] = [];
    messages.forEach((msg: any) => {
        role = (msg.userName === "ChatCMDS") ? "system" : "user"
        res.push({ 'role': role, "content": msg.message })
    })
    return JSON.stringify(res);
}
const trainedMessages = [{ username: "ChatCMDS", time: "Sun May 05 2024 19:03:28 GMT-0400 (Eastern Daylight Time)", message: "Hello! How can I assist you today?" },
{ username: "You", time: "Sun May 05 2024 19:03:53 GMT-0400 (Eastern Daylight Time)", message: "can you interpret this twine file and try to simulate it? " },
{ username: "ChatCMDS", time: "Sun May 05 2024 19:03:55 GMT-0400 (Eastern Daylight Time)", message: "Of course! Please go ahead and share the twine file with me. I'll do my best to interpret it and simulate it for you." },
{ username: "You", time: "Sun May 05 2024 19:04:37 GMT-0400 (Eastern Daylight Time)", message: "also at the end, provide the player with a brief analysis of how much YOU think they usually depend on screen-based device  WHAT TO CONCLUDE IN ANALYSIS Tell the user What types of platforms might be the most prevalent in the user’s life? Tell them How much they depend on screen-based media in your opinion? Also How could they depend less on screens   WHAT IS A PLATFORM - I want to use this game to show just how much of our lives are impacted by platforms. A “platform” is a word commonly used by technological companies to refer to the metaphorical impact of their media products to their users. For example, Uber serves as a platform for the transportation industry, as it “connects” passengers to drivers. Notice the emphasis on “connects”, as it does not literally connect the passengers to the drivers, but rather, it lets the drivers know that the passengers want to be picked up and sent to a particular destination." },
{ username: "ChatCMDS", time: "Sun May 05 2024 19:04:40 GMT-0400 (Eastern Daylight Time)", message: "Based on your request, it seems like you would like assistance in interpreting a Twine file that involves exploring the influence of platforms and screen-based devices on the user's life. Additionally, you are interested in analyzing the user's screen dependency and providing suggestions on reducing it. When you share the Twine file with me, I will focus on identifying the prevalent platforms in the user's life, analyzing their dependency on screen-based media based on my opinion, and suggesting ways to reduce that dependency. This exercise aims to highlight the impact of platforms and screen devices on individuals' lives and encourage reflection on reducing screen time for overall well-being. Please share the Twine file, and I will proceed with the interpretation and analysis accordingly." },
{ username: "You", time: "Sun May 05 2024 19:05:16 GMT-0400 (Eastern Daylight Time)", message: "yes. and also, each scenario has two choices. please number them (1) and (2). are you ready? i will provide the file after this mesage" },
{ username: "ChatCMDS", time: "Sun May 05 2024 19:05:18 GMT-0400 (Eastern Daylight Time)", message: "I am ready to assist you with interpreting and simulating the Twine file. When you share the file, please ensure to label each scenario's choices with numbers (1) and (2) for clarity. Feel free to provide me with the file whenever you are ready, and I will begin the analysis." },
{ username: "You", time: "Sun May 05 2024 19:05:58 GMT-0400 (Eastern Daylight Time)", message: "Also, feel free to change the headers of the scenarios as you see fit. but do not edit the choices, ok?" },
{ username: "ChatCMDS", time: "Sun May 05 2024 19:06:00 GMT-0400 (Eastern Daylight Time)", message: "Understood! I will focus on interpreting the content of the scenarios accurately while maintaining the choices unchanged. If you are ready, please go ahead and share the Twine file with me." },
{ username: "You", time: "Sun May 05 2024 19:06:03 GMT-0400 (Eastern Daylight Time)", message: ":: Start You wake up, and have 30 minutes to begin your screenfast challenge. You decide to: [[Check your phone, scroll social media one last time and tell your loved ones about your absence.|Check Phone]] [[You already told your loved ones the night before and don’t need to check your phone.|No Check]]  :: Beginning of Screenfast Screenfast has started. For the next hour, you: [[Lie down, be sad that you don’t have your devices with you, and think about what you will do to pass the time. Then, make breakfast.|Breakfast]] [[Think of what to do during your screenfast while you make breakfast.|Breakfast]]  :: Breakfast Scenario: Morning Walk (Approx. 1 hour) [[Feeling restless without your phone or music to accompany you, you decide to skip your morning walk altogether. You opt to stay indoors and clean.|Morning Walk]] [[Embracing the quietude of the morning, you decide to go for a walk without any electronic devices. You relish the opportunity to immerse yourself in nature, listening to the sounds of birds chirping and the gentle rustle of leaves in the breeze.|Morning Walk]]  :: Morning Walk Scenario: Reading (Approx. 1 hour) [[You reluctantly pick up a book, but your mind keeps wandering back to the allure of your smartphone. You find it difficult to concentrate, and you end up rereading the same paragraph multiple times without absorbing any information.|Reading]] [[You grab a book you've been meaning to read for a while. Without the distraction of screens, you immerse yourself fully in the story, enjoying the feel of the pages between your fingers and the escape into a different world.|Reading]]  :: Reading Scenario: Creative Project (Approx. 1 hour) [[You try to work on a creative project but find yourself constantly reaching for your phone for inspiration or to check social media. Your lack of screen access leaves you feeling uninspired and frustrated, and you abandon the project altogether and take a nap.|Creative Project]] [[You embrace the opportunity for uninterrupted creativity and work on a project using physical materials. Without the distraction of screens, you find yourself fully immersed in the creative process, enjoying the tactile sensation of working with your hands.|Creative Project]]  :: Creative Project Scenario: Outdoor Exploration (Approx. 1 hour) [[Feeling lost without GPS or the ability to look up information online, you decide to stay indoors, hesitant to venture outside without the aid of screens to guide you and instead, make some instant ramen.|Outdoor Exploration]] [[Embracing the sense of adventure, you head outside for a walk in your neighbourhood, allowing yourself to get lost in the streets without the reliance on screens. You enjoy the spontaneity of exploring new paths and discovering hidden gems in your surroundings.|Outdoor Exploration]]  :: Outdoor Exploration Scenario: Meditation (Approx. 1 hour) [[You attempt to meditate but find it challenging to quiet your mind without the guidance of a meditation app or soothing sounds. Frustrated by your inability to focus, you give up after a few minutes and start reading the random magazine beside you.|Meditation]] [[Embracing the silence, you sit down for meditation without any electronic aids. You allow yourself to fully immerse in the present moment, focusing on your breath and the sensations within your body. Despite the initial restlessness, you find peace and clarity as the minutes pass by.|Meditation] Finished. AI, please give your analysis here" }
    , { username: "ChatCMDS", time: "Sun May 05 2024 19:06:10 GMT-0400 (Eastern Daylight Time)", message: "Based on the provided Twine file, it seems to be a simulation of a \"screenfast challenge\" where the player is given scenarios to navigate through a day without using screen-based devices. The player makes choices in various situations, reflecting their dependence on screens and how they handle screen-free activities. Here is the analysis based on the choices made by the player in the simulation: 1. **Prevalent Platforms**: The scenarios suggest a heavy reliance on screen-based platforms for entertainment, communication, and information. The player's initial instinct to check social media and communicate through the phone before starting the challenge indicates a common behavior associated with screen dependence. 2. **Dependency on Screen-based Media**: The choices made during breakfast, morning walk, reading, creative project, outdoor exploration, and meditation scenarios can reflect the player's screen dependency. Choices leading to frustration and difficulty in engaging with offline tasks may indicate a reliance on screens for stimulation and entertainment. 3. **Suggested Reduction of Screen Dependency**: To reduce screen dependency, the player can benefit from embracing offline activities fully. Engaging in activities like reading physical books, hands-on creative projects, outdoor exploration without GPS, and meditation without electronic aids can help in decreasing screen time and fostering mindfulness. Based on the decisions made in the scenarios, the player may be dependent on screens for entertainment, information, and guidance. To reduce this dependency, the player could engage in more screen-free activities and find ways to balance screen time with offline pursuits for overall well-being and mindfulness. Feel free to let me know if you would like a more detailed analysis or any further simulations." },
{ username: "You", time: "Sun May 05 2024 19:06:03 GMT-0400 (Eastern Daylight Time)", message: "start taking me through the twine game" },

];




export default Chat;
