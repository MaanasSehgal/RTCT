import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { SendHorizontal, X } from 'lucide-react';

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    messages: { userName: string; message: string; }[];
    sendMessage: () => void;
    msgOpen: boolean;
    setMsgOpen: React.Dispatch<React.SetStateAction<boolean>>;
    participantsOpen: boolean;
    setParticipantsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    participants: { id: number, name: string, avatar: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen, message, setMessage, messages, sendMessage, msgOpen, setMsgOpen, participantsOpen, setParticipantsOpen, participants }) => {

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
        if(isSidebarOpen) {
            setMsgOpen(false);
            setParticipantsOpen(false);
        }
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div style={{ height: 'calc(100% - 10rem)' }} className={`w-[22rem] absolute top-18 right-0 bg-[#0e0e11] z-50 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all rounded-lg`}>
            {isSidebarOpen && (
                <div className='w-full h-full'>
                    <button onClick={toggleSidebar} className="p-1 m-2 hover:bg-zinc-800 rounded-full text-white">
                        <X />
                    </button>
                    {msgOpen && (
                        <div style={{ height: 'calc(100% - 40px)' }} className='flex flex-col justify-between gap-4 p-2 h-full'>
                            <div id='msg-container' className='h-full w-full flex flex-col gap-2 overflow-y-scroll'>
                                {/* Display messages with usernames */}
                                {messages.map((msg, index) => (
                                    <div key={index} className={`text-white flex flex-col max-w-[90%] bg-[#1b1b21] p-2 rounded-lg`}>
                                        <div className='flex gap-2'>
                                            <p className='text-lg font-bold text-gray-400'>{msg.userName}</p>
                                            <span className='text-md text-gray-500 px-1'>{getCurrentTime()}</span>
                                        </div>
                                        <p className='w-auto max-w-full break-words text-xl font-bold'>{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='flex gap-2'>
                                <Input
                                    className='text-xl'
                                    id='msg-input'
                                    type='text'
                                    placeholder='Type message'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <SendHorizontal className='text-white h-full w-8 cursor-pointer' onClick={sendMessage} />
                            </div>
                        </div>
                    )}
                    {participantsOpen && (
                        <div style={{ height: 'calc(100% - 40px)' }} className='flex flex-col justify-between gap-4 p-2 h-full'>
                            <h1 className='text-center text-white text-2xl font-bold mb-4'>Participants</h1>
                            <div className='h-full w-full flex flex-col gap-6 overflow-y-scroll'>
                                {/* Display participants */}
                                {participants.map((participant, index) => (
                                    <div key={index} className='flex gap-4 items-center'>
                                        <img src={participant.avatar} alt={participant.name} className='h-10 w-10 rounded-full' />
                                        <p className='text-xl font-bold'>{participant.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebar;