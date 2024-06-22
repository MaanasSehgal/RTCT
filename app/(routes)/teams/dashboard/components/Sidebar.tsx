"use client";
import React, { useState } from "react";
import SideTab from "./Sidetab";

interface SidebarProps {
  tabData: { icon: React.ReactNode; title: string }[];
  handleTabClick: (tab: string) => void;
  selectedTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ tabData, handleTabClick, selectedTab }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex h-screen ${isExpanded ? 'w-64' : 'w-16'} flex-col justify-between border-e bg-[#191B22] transition-all duration-300`}>
      <div className="flex flex-col">
        <button
          className="mt-4 mb-6 me-4 text-gray-500 hover:text-gray-700 bg-gray-700 w-8 h-8 self-end rounded-full"
          onClick={toggleSidebar}
        >
          {isExpanded ? '<' : '>'}
        </button>
        <div className="px-2">
          <div className="space-y-8 pt-2 flex flex-col items-start">
            {tabData.map((tab) => (
              <SideTab
                key={tab.title}
                icon={tab.icon}
                title={tab.title}
                onClick={() => handleTabClick(tab.title)}
                selected={selectedTab === tab.title}
                isExpanded={isExpanded}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;