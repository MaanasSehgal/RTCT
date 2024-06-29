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
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen, message, setMessage, messages, sendMessage }) => {

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{ height: 'calc(100% - 10rem)' }} className={`w-80 absolute top-18 right-0 bg-[#0e0e11] z-50 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all rounded-lg`}>
            {isSidebarOpen && (
                <div className='w-full h-full'>
                    <button onClick={toggleSidebar} className="p-1 m-2 hover:bg-zinc-800 rounded-full text-white">
                        <X />
                    </button>
                    <div style={{ height: 'calc(100% - 40px)' }} className='flex flex-col justify-between gap-2  p-2 bg-slate-500 h-full'>
                        <div className='bg-slate-800 h-full w-full'>
                            {/* Display messages with usernames */}
                            {messages.map((msg, index) => (
                                <div key={index} className='text-white flex items-center'>
                                    <span className="font-bold">{msg.userName}: </span>
                                    <span>{msg.message}</span>
                                </div>
                            ))}
                        </div>
                        <div className='flex gap-2'>
                            <Input
                                id='msg-input'
                                type='text'
                                placeholder='Type message'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <SendHorizontal className='text-white h-full w-6 cursor-pointer' onClick={sendMessage} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;