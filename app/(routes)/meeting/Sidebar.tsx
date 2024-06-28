import { Input } from '@/components/ui/input';
import { Menu, SendHorizontal, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    roomID: string;
}

const socket = io('http://localhost:3000'); // Replace with your socket.io server URL

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen, roomID }) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]); // State to hold messages and their senders

    useEffect(() => {
        // Join the specified room when component mounts
        socket.emit('join', roomID);

        // Listening for incoming messages from the server for the specified room
        socket.on('chat message', (msg: { text: string; sender: string }) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });

        // Clean up socket listener on unmount or dependency change
        return () => {
            socket.off('chat message');
            socket.emit('leave', roomID); // Leave the room when component unmounts
        };
    }, [roomID]);

    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('chat message', { text: message, sender: 'Me' }); // Emitting the message to the server with sender info
            setMessage('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div style={{ height: 'calc(100% - 10rem)' }} className={`w-80 absolute top-18 right-0 bg-[#0e0e11] transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all rounded-lg`}>
            {isSidebarOpen && <div className=' w-full h-full'>
                <button onClick={toggleSidebar} className="p-1 m-2 hover:bg-zinc-800 rounded-full text-white">
                    <X />
                </button>
                <div style={{ height: 'calc(100% - 40px)' }} className='flex flex-col justify-between gap-10 p-2 bg-slate-500 h-full'>
                    <div className="overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 border-b border-gray-700 ${msg.sender === 'Me' ? 'text-right' : 'text-left'}`}>
                                <span className="text-gray-400">{msg.sender}:</span> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className='flex gap-2'>
                        <Input
                            id='msg-input'
                            type='text'
                            placeholder='Type a message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <SendHorizontal className='text-white h-full w-6 cursor-pointer' onClick={sendMessage} />
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Sidebar;
