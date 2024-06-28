import React, {useEffect, useState} from "react";
import {Excalidraw, MainMenu, WelcomeScreen} from "@excalidraw/excalidraw";
import {FILE} from "./FILE";


// const updateWhiteboard = useMutation(api.files.updateWhiteboard);
// useEffect(() => {
//     onSaveTrigger && saveWhiteboard();
// }, [onSaveTrigger]);

// const saveWhiteboard = () => {
//     updateWhiteboard({
//         _id: fileId,
//         whiteboard: JSON.stringify(whiteBoardData),
//     }).then((res) => console.log(res));
// };
const Canvas = ({onSaveTrigger, fileId, fileData}: {onSaveTrigger: any; fileId: any; fileData: FILE}) => {
    //file data not added in the props
    const [whiteBoardData, setWhiteBoardData] = useState<any>();

    return (
        <div className="h-screen">
            {fileData && (
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
                        <MainMenu.DefaultItems.ClearCanvas />
                        <MainMenu.DefaultItems.SaveAsImage />
                        <MainMenu.DefaultItems.ChangeCanvasBackground />
                    </MainMenu>

                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                        <WelcomeScreen.Center>
                            <WelcomeScreen.Center.MenuItemHelp />
                        </WelcomeScreen.Center>
                    </WelcomeScreen>
                </Excalidraw>
            )}
        </div>
    );
};

export default Canvas;
