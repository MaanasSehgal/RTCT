import React from "react";
import ChatNav from "./ChatNav";

const ChatSection = ({onBack}:any) => {
    return (
        <div className="w-full h-full bg-red-500">
            {/* Back button for small screens */}
            <div className="md:hidden p-2 bg-gray-700">
                <button onClick={onBack} className="text-white">
                    Back
                </button>
            </div>
            <ChatNav />
            <div className="w-full h-16 p-2 bg-gray-500">
                <h1 className="text-white">John Doe</h1>
            </div>
        </div>
    );
};

export default ChatSection;
