import { Input, Button, Slider } from '@nextui-org/react'
import React from 'react'

const FeedBackSection = () => {
    return (
        <div className="w-full max-w-[90%] h-[80vh] mx-auto p-4 rounded-[40px] shadow-md flex bg-zinc-950 my-[10vh]">
            <div className="w-1/2 h-full flex flex-col justify-center items-center text-white ps-14 gap-20">
                <div className='flex flex-col gap-4'>
                    <h1 className='text-4xl my-4 self-start text-start'>Help us improve our website!</h1>
                    <p className='w-3/4 self-start text-start'>We're always looking for ways to make our website better. Tell us what you think and how we can improve your experience.</p>
                </div>
                <div className='w-full'>
                    <Slider
                        size="lg"
                        step={1}
                        color="success"
                        label="Your Experience"
                        showSteps={true} 
                        maxValue={5} 
                        minValue={1} 
                        defaultValue={3}
                        className="max-w-md font-bold"
                    />
                </div>
                
            </div>
            <form className="w-1/2 h-full flex flex-col justify-center items-center gap-4 bg-zink-800 rounded-lg">
                <Input
                    type="text"
                    placeholder="Enter your name"
                    className="w-3/4 p-4 text-white"
                    variant="underlined"
                />
                <Input
                    type="text"
                    placeholder="Enter your email"
                    className="w-3/4 p-4 text-white"
                    variant="underlined"
                />
                <textarea className='w-3/4 h-2/5 p-2 rounded-md' name="feedback" id="feedback" placeholder="Enter your feedback"></textarea>
                <Button size={'lg'} variant="ghost" color='success' radius='full' className='self-end mr-20 mt-4 text-xl font-bold hover:text-white'>
                    Submit
                </Button>   
            </form>
        </div>

    )
}

export default FeedBackSection