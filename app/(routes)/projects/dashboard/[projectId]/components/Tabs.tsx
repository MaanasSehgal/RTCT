import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { Bolt, ClipboardPen, Code, MessageSquareText, Video } from "lucide-react";
import Link from "next/link";

const TabsComponent = ({ projectId }: any) => {
    const [activeTab, setActiveTab] = useState<string>('config');

    useEffect(() => {
        console.log("project id = "+ projectId);
        if(activeTab === 'code') {
            window.location.href = `/projects/dashboard/${projectId}/codespace`;
        } else if(activeTab == 'docs') {
            window.location.href = `/projects/dashboard/${projectId}/workspace`;
        }
    }, [activeTab]);

    const goToCode = () => () => {
        setActiveTab('code');
    };

    const goToConfig = () => () => {
        setActiveTab('config');
    };

    const goToDocs = () => () => {
        setActiveTab('docs');
    };

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
                <Tab onCanPlay={goToCode} key="code" title={<Code />} />
                <Tab onClick={goToDocs} key="docs" title={<ClipboardPen />} />
                <Tab onClick={goToConfig} key="config" title={<Bolt />} />
            </Tabs>
        </div>
    );
};

export default TabsComponent;