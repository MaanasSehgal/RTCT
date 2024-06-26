import { X } from 'lucide-react';
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
        <div className={`h-full w-64 fixed top-18 right-0 bg-white transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all`}>
            <button onClick={toggleSidebar} className="p-2 m-2 bg-blue-500 text-white rounded">
                <X />
            </button>
            {isSidebarOpen && <div>Content here</div>}
        </div>
    );
};

export default Sidebar;
