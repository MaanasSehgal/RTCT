import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { MessageSquareText, Video } from "lucide-react";
import Link from "next/link";

const TabsComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('video');


    useEffect(() => {
        const meetingElement = document.getElementById('meeting');
        const spinnerElement = document.getElementById('spinner');
        if(activeTab === 'msg') {
            if(meetingElement && spinnerElement) {
                meetingElement.style.display = 'none';
                spinnerElement.style.display = 'block';
            }
            window.location.href = '/chat';
        }
    }, [activeTab]);

    const gotoMsg = () => {
        setActiveTab('msg');
    }

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
                <Tab onClick={gotoMsg} key="video" title={<Video />} />
            </Tabs>
        </div>
    );
};

export default TabsComponent;