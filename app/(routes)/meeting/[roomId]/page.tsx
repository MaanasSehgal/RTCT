"use client";

import {
    LiveKitRoom, ParticipantLoop, ParticipantName, useParticipants, useRoomContext,
} from "@livekit/components-react";
import "@livekit/components-styles";
import {Track} from "livekit-client";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

export default function Page({params}: any) {
    // TODO: get user input for room and name
    const searchParams = useSearchParams()

    const search = searchParams.get('username')
    const {user, getToken}= useKindeBrowserClient();
    const room = params.roomId;
    const [token, setToken] = useState("");

    // const roomContext = useRoomContext();
    // const participants = useParticipants();

    useEffect(() => {
        if (!user) {
            return;
        }
        (async () => {
            try {
                const resp = await fetch(
                    `/api/get-participant-token?room=${room}&username=${user.given_name+" "+user.family_name}`
                );
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [user]);


    if (token === "") {

        return (
            <div className={"flex w-screen h-screen flex-col"}>
                <NavbarComponent/>
                <div
                    className="w-full h-full flex flex-col justify-center items-center bg-[#111114] rounded-lg z-10 cursor-default">
                    <Spinner size="lg" color="primary"/>
                </div>
            </div>
        )
    }

    return (
        <div className={"flex w-screen h-screen flex-col"}>

            <NavbarComponent/>
            <LiveKitRoom
                video={true}
                audio={true}
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                // Use the default LiveKit theme for nice styles.
                data-lk-theme="default"
                style={{height: '90%'}}
            >
                <VideoConference />
                {/*<ParticipantLoop participants={participants}>*/}
                {/*    <ParticipantName/>*/}
                {/*</ParticipantLoop>*/}
                {/*<ParticipantList/>*/}
            </LiveKitRoom>
        </div>
    );

}
import {VideoConference} from "@/app/(routes)/meeting/components/VIdeoConference";

import NavbarComponent from "@/app/(routes)/meeting/components/Navbar";
import {Spinner} from "@nextui-org/react";
import {ParticipantList} from "@/app/(routes)/meeting/components/participantList";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
