// import { Input, Button, Slider } from '@nextui-org/react'
// import React from 'react'

// const FeedBackSection = () => {
//     return (
//         <div className="w-full max-w-[90%] h-[98vh] md:h-[80vh] mx-auto p-4 rounded-[40px] shadow-md flex flex-col md:flex-row bg-zinc-950 my-[10vh]">
//             <div className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col justify-center items-center text-white md:ps-14 gap-10 md:gap-20">
//                 <div className='flex flex-col px-4 md:px-0 gap-4'>
//                     <h1 className='text-4xl my-4 self-start text-start w-full'>Help us improve our website!</h1>
//                     <p className='w-full self-start text-start'>We're always looking for ways to make our website better. Tell us what you think and how we can improve your experience.</p>
//                 </div>
//                 <div className='md:px-0 px-4 w-full'>
//                     <Slider
//                         size="lg"
//                         step={1}
//                         color="success"
//                         label="Your Experience"
//                         showSteps={true} 
//                         maxValue={5} 
//                         minValue={1} 
//                         defaultValue={3}
//                         className="max-w-md font-bold"
//                     />
//                 </div>

//             </div>
//             <form className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col justify-center items-center gap-4 bg-zink-800 rounded-lg">
//                 <Input
//                     type="text"
//                     placeholder="Enter your name"
//                     className="w-11/12 md:w-3/4 p-4 text-white"
//                     variant="underlined"
//                 />
//                 <Input
//                     type="text"
//                     placeholder="Enter your email"
//                     className="w-11/12 md:w-3/4 p-4 text-white"
//                     variant="underlined"
//                 />
//                 <textarea className='w-11/12 md:w-3/4 h-[30%] md:h-2/5 p-2 rounded-md' name="feedback" id="feedback" placeholder="Enter your feedback"></textarea>
//                 <Button size={'lg'} variant="ghost" color='success' radius='full' className='self-end mr-4 md:mr-20 mt-4 text-xl font-bold hover:text-white'>
//                     Submit
//                 </Button>   
//             </form>
//         </div>

//     )
// }

// export default FeedBackSection


import React, { useEffect, useState } from 'react';
import { Input, Button, Slider } from '@nextui-org/react';
import { toast } from 'sonner';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const FeedBackSection = () => {
    const { user } = useKindeBrowserClient();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            console.log('User:', user);
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!user) {
            event.preventDefault();
            toast.error('You must be logged in to submit feedback.');
        } else {
            event.preventDefault();
            setIsLoading(true);

            const form = event.currentTarget;
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                feedback: formData.get('feedback'),
                experience: formData.get('experience'),
            };

            try {
                const response = await fetch('/api/sendFeedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    toast.success('Feedback sent successfully!');
                } else {
                    toast.error('Error sending feedback.');
                }
            } catch (error) {
                toast.error('Error sending feedback.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const [name, setName] = useState(user && user.given_name || '');
    const [email, setEmail] = useState(user && user.email || '');

    const handleChange = (event: any) => {
        setName(event.target.value);
    };

    return (
        <>
            <div id="scroll-to-feedback" className="w-full max-w-[90%] h-[98vh] md:h-[80vh] mx-auto p-4 rounded-[40px] shadow-md flex flex-col md:flex-row bg-zinc-950 my-[10vh]">
                <div className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col justify-center items-center text-white md:ps-14 gap-10 md:gap-20">
                    <div className="flex flex-col px-4 md:px-0 gap-4">
                        <h1 className="text-4xl my-4 self-start text-start w-full">Help us improve our website!</h1>
                        <p className="w-full self-start text-start">We're always looking for ways to make our website better. Tell us what you think and how we can improve your experience.</p>
                    </div>
                    <div className="md:px-0 px-4 w-4/5 self-start">
                        <Slider
                            size="md"
                            step={1}
                            color="success"
                            label="Your Experience"
                            showSteps={true}
                            maxValue={5}
                            minValue={1}
                            defaultValue={5}
                            className="max-w-md font-bold"
                        />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col justify-center items-center gap-4 bg-zink-800 rounded-lg">
                    <Input type="text" placeholder="Enter your name" name="name" className="w-11/12 md:w-3/4 p-4 text-white" variant="underlined" required />
                    <Input type="email" placeholder="Enter your email" name="email" className="w-11/12 md:w-3/4 p-4 text-white" variant="underlined" required />
                    <textarea className="w-11/12 md:w-3/4 h-[30%] md:h-2/5 p-2 rounded-md" name="feedback" placeholder="Enter your feedback" required></textarea>
                    <input type="hidden" name="experience" value="3" />
                    {isLoading ? (
                        <Button type="submit" size="lg" variant="ghost" color="success" radius="full" className="self-end mr-4 md:mr-20 mt-4 text-xl font-bold hover:text-white" disabled={isLoading} isLoading>
                            Submit
                        </Button>
                    ) : (
                        <Button type="submit" size="lg" variant="ghost" color="success" radius="full" className="self-end mr-4 md:mr-20 mt-4 text-xl font-bold hover:text-white" disabled={isLoading}>
                            Submit
                        </Button>
                    )}
                </form>
            </div>
        </>
    );
};

export default FeedBackSection;