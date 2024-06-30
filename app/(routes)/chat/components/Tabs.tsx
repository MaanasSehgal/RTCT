import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { MessageSquareText, Video } from "lucide-react";
import Link from "next/link";

const TabsComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('msg');

    useEffect(() => {
        const msgElement = document.getElementById('msg');
        const vcElement = document.getElementById('vc');
        const chatElement = document.getElementById('chat');

        if (msgElement && vcElement && chatElement) {
            // console.log("this is msg element = ", msgElement)
            // console.log("this is active tab = ", activeTab)
            if (activeTab === 'msg') {
                msgElement.style.display = 'inline';
                chatElement.style.display = 'flex';
                vcElement.style.display = 'none';
            } else {
                msgElement.style.display = 'none';
                chatElement.style.display = 'none';
                vcElement.style.display = 'inline-block';
                window.location.href = "/meeting";
            }
        }
    }, [activeTab]);

    return (
        <div className="flex flex-wrap gap-4">
            <Tabs 
                key="danger" 
                color="danger" 
                aria-label="Tabs colors" 
                radius="full"
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
            >
                <Tab key="msg" title={<MessageSquareText />} />
                <Tab key="video" title={<Video />} />
            </Tabs>
        </div>
    );
};

export default TabsComponent;
