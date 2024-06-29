"use client";
import React, {useEffect, useState} from "react";
import {Excalidraw, MainMenu, WelcomeScreen} from "@excalidraw/excalidraw";
import {FILE} from "./FILE";
import axios from "axios";
import {toast} from "sonner";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";


const Canvas = ({onSaveTrigger, fileId, fileData}: { onSaveTrigger: any; fileId: any; fileData: FILE }) => {
    //file data not added in the props
    const [whiteBoardData, setWhiteBoardData] = useState<any>();
    // const updateWhiteboard = useMutation(api.files.updateWhiteboard);
    useEffect(() => {
        onSaveTrigger && saveWhiteboard();
    }, [onSaveTrigger]);
    const{user, getToken} = useKindeBrowserClient();
    const pathName = usePathname();
    const saveWhiteboard = () => {
        // updateWhiteboard({
        //     _id: fileId,
        //     whiteboard: JSON.stringify(whiteBoardData),
        // }).then((res) => console.log(res));
        setWhiteBoardData((prevState: any)=>{
            axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/update`,
                {
                    projectId: pathName.split('/').slice(-2, -1)[0],
                    workspace: JSON.stringify(prevState)
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
                    toast("Whiteboard Updated!");
                })
                .catch(function (error) {
                    console.log(error);
                    toast("ERROR: Whiteboard not updated!");
                });
            return prevState;
        });

    };
    return (
        <div className="h-screen">
            {(
                <Excalidraw
                    UIOptions={{
                        canvasActions: {
                            saveToActiveFile: false,
                            loadScene: false,
                        },
                    }}
                    theme="light"
                    initialData={{
                        elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
                    }}
                    onChange={(excalidrawElements, appState, files) => setWhiteBoardData(excalidrawElements)}>
                    <MainMenu>
                        <MainMenu.DefaultItems.ClearCanvas/>
                        <MainMenu.DefaultItems.SaveAsImage/>
                        <MainMenu.DefaultItems.ChangeCanvasBackground/>
                    </MainMenu>

                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint/>
                        <WelcomeScreen.Hints.MenuHint/>
                        <WelcomeScreen.Hints.ToolbarHint/>
                        <WelcomeScreen.Center>
                            <WelcomeScreen.Center.MenuItemHelp/>
                        </WelcomeScreen.Center>
                    </WelcomeScreen>
                </Excalidraw>
            )}
        </div>
    );
};

export default Canvas;
