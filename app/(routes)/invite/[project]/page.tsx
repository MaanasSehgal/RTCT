"use client";
import {RTCTLogo} from '@/components/Logos/Logos';
import {Button} from '@nextui-org/react';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import {Spinner} from "@nextui-org/spinner";
import {toast} from "sonner";

interface Props {
    params: {
        project: string;
    };
}

const Invite: React.FC<Props> = ({params}) => {
    const [projectId, setProjectId] = useState<string>('default');
    const [projectData, setProjectData] = useState<any>(null);
    const {user, getToken} = useKindeBrowserClient();
    useEffect(() => {
        if (params.project && typeof params.project === 'string') {
            setProjectId(params.project);
        }
    }, [params.project]);
    useEffect(() => {
        if (!user) return;
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/requests_page/${projectId}`,
            {
                params: {
                    audience: "rtct_backend_api"
                },
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },
            }
        ).then(function (response) {
            console.log(response);
            setProjectData(response.data);
        })
        ;
    }, [user]);

    function onClick(){
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/request/${projectId}`,
            {
                params: {
                    audience: "rtct_backend_api"
                },
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },
            }
        ).then(function (response) {
            console.log(response);
            toast("Request Sent!");
        }).catch(function(err){
           toast(err.response.data);
           console.log(err);
        });
    }

    // const projectName = "RTCT";
    // const projectImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQV5ST4Npow-7pjpefyX4vyuTD-MFtjmE_MA&s";

    return (
        <div className='h-[--mainheight] flex justify-center items-center bg-[#131217]'>
            <div className='w-11/12 lg:w-2/5 h-3/5 bg-gray-800 rounded-3xl flex shadow-lg'>
                {projectData === null ? <div
                        className="w-11/12 lg:w-2/5  h-3/5 rounded-3xl shadow-lg flex justify-center items-center text-white absolute z-10 bg-gray-800">
                        <Spinner size="lg" color="primary"/>
                    </div> :
                    <>
                        <div className="w-2/5 h-full flex justify-center items-center border-r border-gray-700">
                            <RTCTLogo size="150"/>
                        </div>
                        <div className="w-3/5 h-full flex flex-col items-center justify-center p-6">
                            <img className='object-center object-cover w-32 h-32 rounded-full shadow-md'
                                 src={projectData?.image} alt="Logo"/>
                            <p className='mt-4 text-white text-lg font-semibold'>You have been invited to join
                                "{projectData?.name}"</p>
                            <Button className='mt-6 bg-[--darkBg]' onClick={onClick} size='lg'>Join</Button>
                        </div>
                    </>
                }

            </div>
        </div>
    );
};

export default Invite;
