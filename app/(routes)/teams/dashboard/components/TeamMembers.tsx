"use client";
import Image from "next/image";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from "@nextui-org/react";
import { Mail, Trash2, UserPlus, Search, Copy, Ellipsis, UserRoundPlus, SearchIcon } from "lucide-react";
import { useState } from "react";
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
} from "@/components/UI/alert-dialog"

const TeamMembers = () => {
    const items = [
        {
            key: "message",
            label: "Message",
            logo: <Mail />
        },
        {
            key: "delete",
            label: "Remove User",
            logo: <Trash2 />
        }
    ];
    const users = [
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

    const [copied, setCopied] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.length != 0 ? users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


    return (
        <div className="w-full mt-16 h-[80%] flex flex-col items-center gap-4 ">
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
                                value="rtct.vercel.app"
                                readOnly
                                className="border border-gray-300 rounded-l-full h-10 px-4 w-full"
                            />
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText('rtct.vercel.app');
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

            {users.length == 0 ?
                <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-white text-3xl font-bold">No results found! Invite members to your team.</h1>
                </div>
                : filteredUsers.length == 0 ?
                    <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-white text-3xl font-bold">No results found for query "{searchTerm}"</h1>
                    </div>
                    : filteredUsers.map((user) => (
                        <div key={user.id} className="w-11/12 rounded-full flex items-center justify-between bg-black overflow-y">
                            <div className="flex items-center gap-8 p-3">
                                <Image className="w-12" src={user.avatar == "" ? "/userlogo.png" : user.avatar} alt="logo" width={24} height={24} />
                                <h2 className="text-md">{user.name}</h2>
                            </div>
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="text-white cursor-pointer p-3 px-5"><Ellipsis /></div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                                    {(item) => (
                                        <DropdownItem
                                            key={item.key}
                                            color={item.key === "delete" ? "danger" : "default"}
                                            className={`${item.key === "delete" ? "text-danger" : ""}`}
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