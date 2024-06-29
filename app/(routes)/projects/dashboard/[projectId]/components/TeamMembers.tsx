"use client";
import Image from "next/image";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Accordion, AccordionItem } from "@nextui-org/react";
import { Mail, Trash2, UserPlus, Search, Copy, Ellipsis, UserRoundPlus, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User } from "@/app/utils/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import {toast} from "sonner";

const TeamMembers = ({ data, setData }: any) => {
    const { user, getToken } = useKindeBrowserClient();
    const [teamData, setTeamData] = useState(data);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>(data.members.length != 0 ? data.members.filter((user: User) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []);
    const [copied, setCopied] = useState(false);

    const items = [
        {
            key: "message",
            label: "Message",
            logo: <Mail />,
            click: (id: string) => {
                console.log("Message");
            }
        },
        {
            key: "delete",
            label: "Remove User",
            logo: <Trash2 />,
            click: (id: string) => {
                onMemberRemove(id);
            }
        }
    ];

    const usersDummy = [
        {
            id: "1",
            name: "William",
            email: "William@gmail.com",
            avatar: "/userlogo.png",
            role: "editor",
        },
        {
            id: "2",
            name: "John",
            email: "John@gmail.com",
            avatar: "/userlogo.png",
            role: "editor"
        },
        {
            id: "3",
            name: "Emma",
            email: "Emma@gmail.com",
            avatar: "/userlogo.png",
            role: "viewer"
        },
        {
            id: "4",
            name: "Olivia",
            email: "Olivia@gmail.com",
            avatar: "/userlogo.png",
            role: "editor"
        },
        {
            id: "5",
            name: "James",
            email: "James@gmail.com",
            avatar: "/userlogo.png",
            role: "viewer"
        },
        {
            id: "6",
            name: "Sophia",
            email: "Sophia@gmail.com",
            avatar: "/userlogo.png",
            role: "editor"
        },
        {
            id: "7",
            name: "Liam",
            email: "Liam@gmail.com",
            avatar: "/userlogo.png",
            role: "viewer"
        },
        {
            id: "8",
            name: "Mason",
            email: "Mason@gmail.com",
            avatar: "/userlogo.png",
            role: "editor"
        },
        {
            id: "9",
            name: "Isabella",
            email: "Isabella@gmail.com",
            avatar: "/userlogo.png",
            role: "viewer"
        },
        {
            id: "10",
            name: "Lucas",
            email: "Lucas@gmail.com",
            avatar: "/userlogo.png",
            role: "editor"
        },
        {
            id: "11",
            name: "Mia",
            email: "Mia@gmail.com",
            avatar: "/userlogo.png",
            role: "viewer"
        },
        {
            id: "12",
            name: "Charlotte",
            email: "Charlotte@gmail.com",
            avatar: "/userlogo.png",
            role: "editor"
        },
        {
            id: "13",
            name: "Amelia",
            email: "Amelia@gmail.com",
            avatar: "/userlogo.png",
            role: "viewer"
        },
        {
            id: "14",
            name: "Ethan",
            email: "Ethan@gmail.com",
            avatar: "/userlogo.png",
            role: "editor"
        },
        {
            id: "15",
            name: "Harper",
            email: "Harper@gmail.com",
            avatar: "/userlogo.png",
            role: "viewer"
        }
    ];

    const pendingRequests = [
        {
            id: "1",
            name: "Maanas",
            email: "maanas.sehgal@gmail.com",
            image: "/userlogo.png",
        },
        {
            id: "1",
            name: "Dibyajyoti",
            email: "dibyajyoti@gmail.com",
            image: "/userlogo.png",
        }, {
            id: "1",
            name: "devendra",
            email: "devendra@gmail.com",
            image: "/userlogo.png",
        },
    ]



    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };




    useEffect(() => {
        if(!user)return;
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${data.projectId}`,
            {
                params: {
                    audience: "rtct_backend_api"
                },
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },
            }
        ).then(function (response) {
            console.log(response);
            setTeamData(response.data);
            setData(response.data);
            setTeamData((prevState: any) => {
                setFilteredUsers(prevState.members.length != 0 ? prevState.members.filter((user: User) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) : []);
                return prevState;
            });
            toast("Updated!");
        }).catch(function(err){
            toast(err.response.data);
            console.log(err);
        });
    }, [user]);


    async function onMemberAcceptDeny(id:string, accepted:boolean){
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/update`,
            {
                projectId: data?.projectId,
                addMemberId: accepted?id:null,
                removePendingMemberId: accepted?null:id
            },
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
                console.log(response);
                // setDataState(response.data)
                setTeamData(response.data);
                setData(response.data);
                toast(accepted?"Member Added!" : "Member Denied!");
            })
            .catch(function (error) {
                console.log(error);
                toast("ERROR: Member not added!");
            });
    }

    async function onMemberRemove(id: string) {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/update`,
            {
                projectId: data?.projectId,
                remMemberId: id
            },
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
                console.log(response);
                // setDataState(response.data)
                setTeamData(response.data);
                setData(response.data);
                toast("Member Removed!");
            })
            .catch(function (error) {
                console.log(error);
                toast("ERROR: Member not Removed!");
            });
    }



    return (
        <div className="w-full mt-16 h-[80%] flex flex-col items-center gap-4 ">
            {teamData && teamData.pendingMembers.length !== 0 && (
                <>
                    <Accordion className="bg-zinc-900">
                        <AccordionItem className="px-4 rounded-lg shadow-sm text-xl" title={<span className="text-3xl font-bold self-start ml-4 mb-4">Pending Requests</span>}>
                            {teamData.pendingMembers.map((member: any) => (
                                <div key={member.id} className="md:w-4/5 w-72 my-6 md:p-0 p-4 md:rounded-full rounded-[20px] flex md:flex-row flex-col  items-center justify-between bg-black overflow-y">
                                    <div className="flex items-center gap-8 p-3">
                                        <Image className="w-12 rounded-full" src={member.image ? member.image : "/userlogo.png"} alt="logo" width={200} height={200} />
                                        <h2 className="text-md">{member.name}</h2>
                                    </div>
                                    <div className="flex justify-center items-center mr-4 gap-3">
                                        <Button className="text-lg font-bold" size="md" radius="full" variant="ghost" color="danger"
                                        onClick={()=>{onMemberAcceptDeny(member.id, false)}}>Deny</Button>
                                        <Button className="text-lg font-bold" size="md" radius="full" color="success"
                                        onClick={()=>{onMemberAcceptDeny(member.id, true)}}>Accept</Button>
                                    </div>
                                </div>
                            ))}
                        </AccordionItem>
                    </Accordion>

                </>
            )}

            <h1 className="text-3xl font-bold self-start ml-10 mb-4">Manage Team Members</h1>

            <div className="flex items-center self-center sm:w-4/5 md:w-3/5 rounded-full">
                <label htmlFor="#searchTeamMember"></label><SearchIcon />
                <Input
                    id="searchTeamMember"
                    type="text"
                    placeholder={`Search for a team member...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-4"
                    variant="underlined"
                />
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="bg-[#8964E8] rounded-full flex items-center px-3">
                            <UserRoundPlus size={50} className="" strokeWidth={4} />
                            <p className="font-bold text-lg">Invite</p>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <div className="flex justify-between items-center">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Invite a Team Member</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Share this link to invite a new member to your team.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogCancel asChild>
                                <button className="text-red-500 font-bold text-xl">✕</button>
                            </AlertDialogCancel>
                        </div>
                        <div className="flex items-center mt-4">
                            <input
                                type="text"
                                value={`${window.location.host}/invite/${data.projectId}`}
                                readOnly
                                className="border border-gray-300 rounded-l-full h-10 px-4 w-full"
                            />
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.host}/invite/${data.projectId}`);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="bg-white text-black rounded-r-full h-10 px-4"
                            >
                                <Copy />
                            </Button>
                        </div>
                        {copied && <p className="text-green-500 mt-2">Link copied!</p>}
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {teamData.members.length == 0 ?
                <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-white text-3xl font-bold">No results found! Invite members to your team.</h1>
                </div>
                : filteredUsers.length == 0 ?
                    <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-white text-3xl font-bold">No results found for query "{searchTerm}"</h1>
                    </div>
                    : filteredUsers.map((member: User) => (
                        <div key={member.id} className="w-11/12 rounded-full flex items-center justify-between bg-black overflow-y">
                            <div className="flex items-center gap-8 p-3">
                                <Image className="w-12 rounded-full" src={member.image} alt="logo" width={500} height={500} />
                                <h2 className="text-md">{member.name}</h2>
                                {(member.id === data.adminId) && (
                                    <span className="ml-auto">Admin</span>
                                )}
                            </div>
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="text-white cursor-pointer p-3 px-5"><Ellipsis /></div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Dynamic Actions" items={items.filter((item) => {
                                    if (item.key === "delete") {
                                        return user?.id === data.adminId && member.id !== data.adminId;
                                    }
                                    return true;
                                })}>
                                    {(item) => (
                                        <DropdownItem
                                            key={item.key}
                                            color={item.key === "delete" ? "danger" : "default"}
                                            className={`${item.key === "delete" ? "text-danger" : ""}`}
                                            onClick={()=>{item.click(member.id)}}
                                        >
                                            <div className="flex items-center gap-3">
                                                {item.logo}
                                                {item.label}
                                            </div>
                                        </DropdownItem>
                                    )}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    ))}
        </div>
    );
};

export default TeamMembers;