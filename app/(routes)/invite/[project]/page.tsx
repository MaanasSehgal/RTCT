"use client";
import { RTCTLogo } from '@/components/Logos/Logos';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "sonner";
import NavbarComponent from '@/components/Navbar/Navbar';
import FooterComponent from '@/components/Footer/Footer';

interface Props {
    params: {
        project: string;
    };
}

const Invite: React.FC<Props> = ({ params }) => {
    const [projectId, setProjectId] = useState<string>('default');
    const [projectData, setProjectData] = useState<any>(null);
    const { user, getToken } = useKindeBrowserClient();
    const [sentRequest, setSentRequest] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);
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
            setNotFound(false);
        }).catch((e) => {
            console.log(e);
            setNotFound(true);
        });
    }, [user]);

    function onClick() {
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
            setSentRequest(true);
        }).catch(function (err) {
            toast(err.response.data);
            console.log(err);
        });
    }

    // const projectName = "RTCT";
    // const projectImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQV5ST4Npow-7pjpefyX4vyuTD-MFtjmE_MA&s";

    return (
        <>
            <NavbarComponent />
            <div className="h-[--mainheight] w-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center bg-black">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className='sm:w-3/5 lg:w-2/5 h-3/5 bg-[#131217] rounded-3xl flex shadow-sm shadow-purple-400'>
                    {notFound ?
                        <>
                            <div className="w-full p-6 text-center h-full flex flex-col justify-center items-center text-white">Invalid link. Please check your invite and try again later or contact the admin.
                                <Button className='mt-6 bg-purple-500' size='lg' onClick={() => window.location.href = '/'}>Go to Home</Button>
                            </div>
                        </>
                        : projectData === null ? <div
                            className="sm:w-3/5 lg:w-2/5  h-3/5 rounded-3xl shadow-lg flex justify-center items-center text-white absolute z-10 bg-gray-800">
                            <Spinner size="lg" color="primary" />
                        </div> :
                            <>
                                <div className="w-2/5 h-full flex justify-center items-center border-r border-gray-700">
                                    <RTCTLogo size="150" />
                                </div>
                                <div className="w-3/5 h-full flex flex-col items-center justify-center p-6">
                                    <img className='object-center object-cover w-32 h-32 rounded-full shadow-md'
                                        src={projectData?.image} alt="Logo" />
                                    {sentRequest ? <div>Request has been sent, please wait for getting accepted into <b>{projectData?.name}</b></div> :
                                        <>
                                            <p className='mt-4 text-white text-lg font-semibold'>You have been invited to join
                                                "{projectData?.name}"</p>
                                            <Button className='mt-6 bg-[--darkBg]' onClick={onClick} size='lg'>Join</Button>
                                        </>
                                    }
                                </div>
                            </>
                    }

                </div>
            </div>
            <FooterComponent/>
        </>
    );
};

export default Invite;
