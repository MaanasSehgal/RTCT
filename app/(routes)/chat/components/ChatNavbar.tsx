import React, { useState, useRef, useEffect } from "react";
import { CircleArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/Logos/Logos";
import Tabs from './Tabs'

const ChatNavbar = ({ onBack }: any) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-1 border-white w-full h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button onClick={onBack}>
          <CircleArrowLeft />
        </button>

        <div className="flex items-center gap-3 ps-4">
          <Image src="/userLogo.png" alt="image" width={40} height={40} />
          <h2>Team RTCt</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isSearchVisible ? (
          <Input
            ref={searchRef}
            classNames={{
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "rounded-full h-full font-normal text-default-500",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} width={18} height={18} />}
            type="search"
            variant={"underlined"}
          />
        ) : (
          <button onClick={() => setIsSearchVisible(true)}>
            <Search />
          </button>
        )}

        <Tabs/>
      </div>
    </div>
  );
};

export default ChatNavbar;
