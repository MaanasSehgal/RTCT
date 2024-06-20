"use client";

import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {MessageSquareText, Video} from "lucide-react";

export default function App() {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options">
                <Tab key="chat" title={<MessageSquareText />}>
                    <Card>
                        <CardBody>
                            
                        </CardBody>
                    </Card>
                </Tab>

                <Tab key="music" title={<Video />}>
                    <Card>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
