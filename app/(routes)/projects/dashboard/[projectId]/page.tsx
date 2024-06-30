"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/(routes)/projects/dashboard/[projectId]/components/Sidebar";
import Configuration from "@/app/(routes)/projects/dashboard/[projectId]/components/Configuration";
import TeamMembers from "@/app/(routes)/projects/dashboard/[projectId]/components/TeamMembers";
import Commits from "@/app/(routes)/projects/dashboard/[projectId]/components/Commits";
import KanbanBoard from "@/app/(routes)/projects/dashboard/[projectId]/components/KanbanBoard";
import { Activity, GitCommitHorizontal, Kanban as KanbanIcon, Settings2, Users } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Board from "@/app/(routes)/projects/dashboard/[projectId]/components/Board";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import NavbarComponent from "./components/Navbar";
import { Progress } from "@nextui-org/react";

const Dashboard = ({ params }: { params: { projectId: string } }) => {
    const [project, setProject] = useState(undefined);
    const [unAuthorized, setUnauthorized] = useState(false);
    const data = [
        { icon: <Settings2 size={30} />, title: "Configuration" },
        { icon: <Users size={30} />, title: "Team Members" },
        { icon: <GitCommitHorizontal size={30} />, title: "Commits" },
        { icon: <KanbanIcon size={30} />, title: "Kanban" },
    ];

    const { user, getToken } = useKindeBrowserClient();

    const componentMap: { [key: string]: JSX.Element } = {
        "Configuration": <Configuration data={project} setData={setProject} />,
        "Team Members": <TeamMembers data={project} setData={setProject} />,
        "Commits": <Commits data={project}/>,
        "Kanban": <KanbanBoard />,
    };

    const [selectedTab, setSelectedTab] = useState<string>("Configuration");

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        const footer = document.querySelector('Footer') as HTMLElement;
        if (footer) {
            footer.style.display = 'none';
        }
    }, []);

    useEffect(() => {
        if (!user) return;
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${params.projectId}`,
            {
                params: {
                    audience: "rtct_backend_api"
                },
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },

            }
        )
            .then(function (response) {
                console.log(response.data);
                console.log(user.id);
                setProject(response.data);
                if (response.data.members.find((member: any) => member.id === user.id) === undefined) {
                    setUnauthorized(true);
                } else {
                    setUnauthorized(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setUnauthorized(true);
            });
    }, [user]);
    console.log(params.projectId);

    return (
        <>
        <NavbarComponent projectId={params.projectId} />
            <div id="config" className="h-[--mainheight] w-full bg-[#0D1117] flex">
                {unAuthorized ?
                    <div className="w-full h-full flex justify-center items-center text-white">You are not authorized to
                        view this page.</div>
                    :
                    <>
                        {project === undefined ? <div
                            className="w-full h-full flex justify-center items-center text-white absolute z-10 bg-background">
                            <Spinner size="lg" color="primary" />
                        </div> : null}
                        <Sidebar tabData={data} handleTabClick={handleTabClick} selectedTab={selectedTab} />
                        <Board boardData={componentMap[selectedTab]} />
                    </>
                }
            </div>
            <div id="config-spinner" className="w-full h-[--mainheight] bg-[--chatSectionBg] rounded-t-[30px] rounded-r-[30px] hidden text-center text-2xl">
                <Progress
                    color='danger'
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                    className="w-full color-blue-500"
                />
            </div>
        </>
    );
};

export default Dashboard;
