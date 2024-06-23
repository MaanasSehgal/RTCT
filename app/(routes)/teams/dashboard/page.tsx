"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Configuration from "./components/Configuration";
import TeamMembers from "./components/TeamMembers";
import Commits from "./components/Commits";
import Activities from "./components/Activities";
import Kanban from "./components/Kanban";
import { Activity, GitCommitHorizontal, Kanban as KanbanIcon, Settings2, Users } from "lucide-react";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Board from "./components/Board";

const Dashboard: React.FC = ({ mainData }: any) => {

  useEffect(() => {
    const footer = document.querySelector('Footer') as HTMLElement;
    if (footer) {
        footer.style.display = 'none';
    }
}, []);

  const data = [
    { icon: <Settings2 />, title: "Configuration" },
    { icon: <Users />, title: "Team Members" },
    { icon: <GitCommitHorizontal />, title: "Commits" },
    { icon: <Activity />, title: "Activities" },
    { icon: <KanbanIcon />, title: "Kanban" },
  ];

  const componentMap: { [key: string]: JSX.Element } = {
    "Configuration": <Configuration projectId={"123"} />,
    "Team Members": <TeamMembers />,
    "Commits": <Commits />,
    "Activities": <Activities />,
    "Kanban": <Kanban />,
  };

  const [selectedTab, setSelectedTab] = useState<string>("Configuration");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  //const getUser=useQuery(api.user.getUser,{email:user?.email});

  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      checkUser()
    }
  }, [user])


  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture
      }).then((resp) => {
        console.log(resp)
      })
    }

  }

  return (
    <div className="w-full bg-[#0D1117] flex h-[93vh] lg:h-[90vh] overflow-hidden">
      <Sidebar tabData={data} handleTabClick={handleTabClick} selectedTab={selectedTab} />
      <Board boardData={componentMap[selectedTab]} />
    </div>
  );
};

export default Dashboard;
