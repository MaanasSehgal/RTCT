import {ParticipantLoop, ParticipantName, useParticipants, useRoomContext} from "@livekit/components-react";
import {VideoConferenceProps} from "@/app/(routes)/meeting/components/VIdeoConference";
import * as React from "react";


export function ParticipantList(){
    const room = useRoomContext();
    const participants = useParticipants({room});
    return (
        <div className={"w-screen h-screen bg-red-500 absolute z-100"}>
            {participants.map((participant) => (
                <span>{participant.name}</span>
            ))}
        </div>
    )
}