"use client";
import React, {useState, useEffect} from "react";
import SideBar from "./components/ChatSidebar";
import ChatSection from "./components/ChatSection";
// import { chatData } from "@/app/data/chats";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {socket} from "@/app/utils/socket";
import axios from "axios";

const ChatApp = () => {

    const {user, getToken} = useKindeBrowserClient();
    const [showChat, setShowChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [chatData, setChatData] = useState(new Map<string, [{}, [{}?]]>());
    const [drafts, setDrafts] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const footer = document.querySelector('Footer') as HTMLElement;
        if (footer) {
            footer.style.display = 'none';
        }
    }, []);

    //TODO GET INITIAL CHATS

    useEffect(() => {
        if (!user && !getToken()) return;

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/initial_chats`,
            {
                params: {
                    audience: "rtct_backend_api"
                },
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },

            }
        )
            .then(function (response) {
                console.log(response);
                if(!response.data)return;
                let map = new Map<string, [{},[]]>
                for(let project of response.data){
                    map.set(project.projectId, [{
                        id: project.projectId,
                        first_name: project.name,
                        last_name: '',
                        type: 'group',
                        image: project.image
                    },[]])
                }
                for(let project of response.data){
                    for(let member of project.members){
                        map.set(member.id, [{
                            id: member.id,
                            first_name: member.name,
                            last_name: '',
                            type: 'personal',
                            image: member.image
                        },[]])
                    }

                }
                setChatData(map);
            })
            .catch(function (error) {
                console.log(error);
            });

        socket.auth = {token: getToken()};
        socket.connect();
        console.log("socket");

        socket.on('message:receive', (sender, msg: any) => {
            setChatData((prevState) => {
                const currentState = prevState;
                const data = prevState.get(sender.id);
                if (!data) {
                    currentState.set(sender.id, [sender, [msg]]);
                    return currentState;
                }
                data[1].push(msg);
                setSelectedChat((chat: any) => {
                    if (chat[0].id === sender.id) {
                        return data;
                    }
                    return chat;
                })
                return currentState.set(sender.id, data);
            });
        });


        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message:receive');
        };
    }, [user]);


    const defaultChat = {id: 1, image: "/userlogo.png", name: "Maanas Sehgal", time: "2:12", notifications: "30"};

    const handleChatClick = (chat: any) => {
        setShowChat(true);
        setSelectedChat(chat);
    };

    const handleDraftChange = (chatId: string, draft: string) => {
        setDrafts((prevDrafts) => ({...prevDrafts, [chatId]: draft}));
    };

    const onSend = (target: any, msg: string) => {
        console.log("send", target, msg);
        socket.emit("message:send", target.id, msg);
    }

    return (
        <div className="h-[93vh] lg:h-[90vh] flex bg-black">
            <div className={`${showChat ? "hidden" : "block"} md:block w-full md:w-1/4`}>
                <SideBar
                    chatData={chatData}
                    onChatClick={handleChatClick}
                    selectedChat={selectedChat}
                />
            </div>
            <div className={`${showChat ? "block" : "hidden"} md:block w-full md:w-3/4`}>
                {showChat ? (
                    <ChatSection
                        chatData={selectedChat}
                        onBack={() => setShowChat(false)}
                        draft={drafts[selectedChat?.chatID] || ""}
                        onDraftChange={handleDraftChange}
                        onSend={onSend}
                    />
                ) : (
                    <ChatSection chatData={selectedChat} onBack={() => {
                    }} selectedChat={defaultChat}/>
                )}
            </div>
        </div>
    );
};

export default ChatApp;
