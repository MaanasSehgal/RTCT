"use client";
import { RTCTLogo } from '@/components/Logos/Logos';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
    params: {
        project: string;
    };
}

const Invite: React.FC<Props> = ({ params }) => {
    const [projectId, setProjectId] = useState<string>('default');

    useEffect(() => {
        if (params.project && typeof params.project === 'string') {
            setProjectId(params.project);
        }
    }, [params.project]);

    const projectName = "RTCT";
    const projectImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQV5ST4Npow-7pjpefyX4vyuTD-MFtjmE_MA&s";

    return (
        <div className='h-[--mainheight] flex justify-center items-center bg-[#131217]'>
            <div className='sm:w-3/5 lg:w-2/5 h-3/5 bg-gray-800 rounded-3xl flex shadow-lg'>
                <div className="w-2/5 h-full flex justify-center items-center border-r border-gray-700">
                    <RTCTLogo size="150" />
                </div>
                <div className="w-3/5 h-full flex flex-col items-center justify-center p-6">
                    <img className='object-center object-cover w-32 h-32 rounded-full shadow-md' src={projectImg} alt="Logo" />
                    <p className='mt-4 text-white text-lg font-semibold'>You have been invited to join "{projectName}"</p>
                    <Button className='mt-6 bg-[--darkBg]' size='lg'>Join</Button>
                </div>
            </div>
        </div>
    );
};

export default Invite;
