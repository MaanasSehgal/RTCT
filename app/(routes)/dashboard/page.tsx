"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Board from "./components/board";
import Configuration from "./components/configuration";
import TeamMembers from "./components/TeamMembers";
import Commits from "./components/Commits";
import Activities from "./components/Activities";
import Kanban from "./components/Kanban";
import { Activity, GitCommitHorizontal, Kanban as KanbanIcon, Settings2, Users } from "lucide-react";

const Dashboard: React.FC = ({mainData} : any) => {
  const data = [
    { icon: <Settings2 />, title: "Configuration" },
    { icon: <Users />, title: "Team Members" },
    { icon: <GitCommitHorizontal />, title: "Commits" },
    { icon: <Activity />, title: "Activities" },
    { icon: <KanbanIcon />, title: "Kanban" },
  ];

  const componentMap: { [key: string]: JSX.Element } = {
    "Configuration": <Configuration projectId={"123"}/>,
    "Team Members": <TeamMembers />,
    "Commits": <Commits />,
    "Activities": <Activities />,
    "Kanban": <Kanban />,
  };

  const [selectedTab, setSelectedTab] = useState<string>("Configuration");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full h-screen bg-[#131217] flex">
      <Sidebar tabData={data} handleTabClick={handleTabClick} selectedTab={selectedTab} />
      <Board boardData={componentMap[selectedTab]} />
    </div>
  );
};

export default Dashboard;
