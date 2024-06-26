import React from "react";
import { Tooltip } from "@nextui-org/react";

interface SideTabProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  selected: boolean;
  isExpanded: boolean;
}

const SideTab: React.FC<SideTabProps> = ({ icon, title, onClick, selected, isExpanded }) => {
  return (
    <div
      className={`w-full h-12 p-2 flex justify-start items-center hover:text-white ${selected ? 'bg-[#7731d8]' : 'hover:bg-[#564977]'} cursor-pointer rounded-md`}
      onClick={onClick}
    >
      <div>{icon}</div>
      {isExpanded && (
        <div className="ml-4 text-lg font-medium text-white">
          {title}
        </div>
      )}
    </div>
  );
};

export default SideTab;