import { Input } from '@nextui-org/react'
import React from 'react'
import { Button } from '../UI/button'

const FeedBackSection = () => {
    return (
        <div className="w-full max-w-[90%] h-[100vh] mx-auto p-4 rounded-lg shadow-md flex">
            <div className="w-1/2 h-full flex flex-col justify-center items-center text-white">
                <h1 className='text-4xl my-4 self-start text-start'>We value your feedback</h1>
                <p className='w-3/4 self-start text-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima itaque sint voluptas earum error.</p>
            </div>
            <form className="w-1/2 h-full flex flex-col justify-center items-center gap-4 p-4">
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
                <textarea className='w-3/4 h-1/2 p-2 rounded-md' name="feedback" id="feedback" placeholder="Enter your feedback"></textarea>
                <button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>Submit</button>
            </form>
        </div>

    )
}

export default FeedBackSection