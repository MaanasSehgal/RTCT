import { Menu, X } from 'lucide-react';
import React from 'react';

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{ height: 'calc(100% - 10rem)' }} className={`w-72 absolute top-18 right-0 bg-[#0e0e11] transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all rounded-lg`}>
            {isSidebarOpen && <div className=' w-full h-full'>
                <button onClick={toggleSidebar} className="p-1 m-2 hover:bg-zinc-800 rounded-full text-white">
                    <X />
                </button>
            </div>}
        </div>
    );
};

export default Sidebar;
