import Image from "next/image";
import { EllipsisVertical } from 'lucide-react';
const Users = ({ user }: any) => {
    return (
        <div className="bg-red-500 w-full h-full rounded-full flex justify-between items-center-4 gap-4">


        </div>
    );
}

export default Users;

//  <div className="flex justify-between items-center gap-2">
//                 <Image src={user.avatar != "" ? user.avatar : "/userlogo.png"} alt={user.name} width={30} height={30}/>
//                 <h2>{user.name}</h2>
//             </div>