"use client";
import React, {useEffect, useRef, useState} from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import ImageTool from "@editorjs/image";
// @ts-ignore
import CodeBox from "@bomdi/codebox";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";

import {toast} from "sonner";
import {FILE} from "./FILE";

const rawDocument = {
    time: 1550476186479,
    blocks: [
        {
            data: {
                text: "Document Name",
                level: 2,
            },
            id: "123",
            type: "header",
        },
        {
            data: {
                level: 4,
            },
            id: "1234",
            type: "header",
        },
    ],
    version: "2.8.1",
};
const Editor = ({onSaveTrigger, fileId, fileData}: {onSaveTrigger: any; fileId: any; fileData: FILE}) => {
    const ref = useRef<EditorJS>();
    // const updateDocument = useMutation(api.files.updateDocument);

    const [document, setDocument] = useState(rawDocument);

    // useEffect(() => {
    //     if (!ref.current) {
    //         fileData && initEditor(); 
    //     }
    //     return () => {
    //         if (ref.current) {
    //             ref.current.destroy();
    //             ref.current = undefined;
    //         }
    //     };
    // }, [fileData]);

    useEffect(() => {
        // console.log("Trigger value: ", onSaveTrigger);
        onSaveTrigger && onSaveDocument();
    }, [onSaveTrigger]);

    const initEditor = () => {
        const editor = new EditorJS({
            tools: {
                paragraph: {
                    class: Paragraph,
                    shortcut: "CTRL+P",
                    inlineToolbar: true,
                },
                header: {
                    class: Header,
                    shortcut: "CTRL+H",
                    config: {
                        placeholder: "Enter Header",
                    },
                },
                list: {
                    class: List,
                    shortcut: "CTRL+L",
                    inlineToolbar: true,
                    config: {
                        defaultStyle: "unordered",
                    },
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                image: {
                    class: ImageTool,
                    shortcut: "CTRL+I",
                    config: {
                        endpoints: {
                            byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                            byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
                        },
                    },
                },
                codeBox: {
                    class: CodeBox,
                    config: {
                        themeURL: "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
                        themeName: "atom-one-dark", // Optional
                        useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
                    },
                },
            },
            holder: "editorjs",
            // data: fileData.document ? JSON.parse(fileData.document) : rawDocument,
        });
        ref.current = editor;
    };

    const onSaveDocument = () => {
        // if (ref.current) {
        //     ref.current
        //         .save()
        //         .then((outputData) => {
        //             console.log("Article data: ", outputData);
        //             updateDocument({
        //                 _id: fileId,
        //                 document: JSON.stringify(outputData),
        //             }).then(
        //                 (res) => {
        //                     toast("Document Updated!");
        //                 },
        //                 (e) => {
        //                     toast("Server Error: ", e);
        //                 },
        //             );
        //         })
        //         .catch((error) => {
        //             console.log("Saving failed: ", error);
        //         });
        // }
    };
    return (
        <div>
            <div className="ml-20" id="editorjs"></div>
        </div>
    );
};

export default Editor;
