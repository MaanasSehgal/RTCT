import React from "react";
import {Tabs, Tab} from "@nextui-org/react";
import { MessageSquareText, Video } from 'lucide-react';
export default function App() {

  return (
    <div className="flex flex-wrap gap-4">
        <Tabs key={"danger"} color={"danger"} aria-label="Tabs colors" radius="full">
          <Tab key="msg" title={<MessageSquareText/>}/>
          <Tab key="video" title={< Video />}/>
        </Tabs>
    </div>
  );
}
