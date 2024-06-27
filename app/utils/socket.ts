import {io} from "socket.io-client";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const socket = io(URL, {
    autoConnect: false,
});