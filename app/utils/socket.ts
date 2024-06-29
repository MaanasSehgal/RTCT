import {io} from "socket.io-client";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://mrflyn.krak8.xyz" || "";
// const URL = "http://localhost:8000" || "";

export const socket = io(URL, {
    autoConnect: false,
    path: "/socket.io",
    transports: ['websocket', 'polling', 'flashsocket']
});