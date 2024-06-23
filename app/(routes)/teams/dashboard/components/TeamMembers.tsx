import { CircleEllipsis, Trash2 } from "lucide-react";
import Image from "next/image";

const TeamMembers = () => {
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

    return (
        <div className="w-full mt-16 flex flex-col items-center gap-4 mb-10">
            {/* <div className="bg-transparent my-2 w-4/5 flex gap-2">
                <Image src="/userlogo.png" alt="logo" width={24} height={24} />
                <h1>John Doe (Owner)</h1></div> */}
            <h1 className="text-3xl font-bold">Manage Team Members</h1>
            {users.map((user) => {
                return (
                    <div className="w-4/5 rounded-full flex items-center justify-between bg-black p-2">
                        <div className="flex items-center gap-8 p-3">
                            <Image className="w-12" src={user.avatar} alt="logo" width={24} height={24} />
                            <h2 className="text-md">{user.name}</h2>
                        </div>
                        <div className="text-white flex items-center gap-4 cursor-pointer p-3">
                            <Trash2 color="#DB1057" size={30} />
                            <CircleEllipsis size={30} />
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default TeamMembers