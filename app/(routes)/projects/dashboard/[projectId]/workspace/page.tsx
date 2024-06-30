"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import Canvas from "./_components/Canvas";
import Editor from "./_components/Editor";
import WorkspaceHeader from "./_components/WorkspaceHeader";
import { FILE } from "./_components/FILE";
import NavbarComponent from "./_components/Navbar";
import { Progress } from "@nextui-org/react";

const Workspace = ({ params }: any) => {
    const [triggerSave, setTriggerSave] = useState(false);
    const [fileData, setFileData] = useState<FILE | any>();
    const [isVertical, setIsVertical] = useState(false);
    useEffect(() => {
        console.log("File Id: ", params.fileId);
        // params.fileId && getFileData();
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsVertical(false); // Horizontal for large screens
            } else {
                setIsVertical(true); // Vertical for medium screens and smaller
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener("resize", handleResize);
    }, [params]);
    // const getFileData = async () => {
    //     const result = await convex.query(api.files.getFileById, {_id: params.fileId});
    //     console.log("FileName: ", result.fileName);
    //     // console.log(result);
    //     setFileData(result);
    // };
    return (
        <>
        <NavbarComponent projectId={params.projectId}/>
            <div id="docs" className={`w-screen h-[${isVertical ? "200" : "100"}vh] flex flex-col`}>
                {/*<WorkspaceHeader fileName={fileData && fileData?.fileName} onSave={() => setTriggerSave(!triggerSave)} />*/}
                <ResizablePanelGroup direction={isVertical ? "vertical" : "horizontal"} className=" ">
                    <ResizablePanel defaultSize={50}>
                        <div className={` ${isVertical ? "h-screen" : "h-full"} w-full bg-white`}><Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} /></div>
                    </ResizablePanel>
                    <ResizableHandle withHandle className={`${isVertical ? "h-2" : "w-2"}`} />
                    <ResizablePanel defaultSize={50}>
                        <div className={` ${isVertical ? "h-screen" : "h-full"} overflow-auto bg-blue-500 w-full`}><Canvas onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} /></div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <div id="docs-spinner" className="w-full h-[--mainheight] bg-[--chatSectionBg] rounded-t-[30px] rounded-r-[30px] hidden text-center text-2xl">
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
    // return <div>Workspace</div>;
};

export default Workspace;
