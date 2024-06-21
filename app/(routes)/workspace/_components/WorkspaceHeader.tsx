import {Button} from "@/components/UI/button";
import {Link, Save} from "lucide-react";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = ({fileName, onSave}: any) => {
    return (
        <div className="h-[60px] w-full bg-white p-3 border-b flex justify-between items-center ">
            <div className="flex gap-2 items-center">
                <Image src={"/logo.png"} alt="logo" height={40} width={40} />
                <h2>{fileName}</h2>
            </div>
            <div className="flex items-center gap-4">
                <Button onClick={() => onSave()} className="h-8 text-[12px] gap-2 bg-yellow-600 hover:bg-yellow-700">
                    <Save className="h-4 w-4" />
                    Save
                </Button>

                <Button className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700">
                    Share <Link className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default WorkspaceHeader;
