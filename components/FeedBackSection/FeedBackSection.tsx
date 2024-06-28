import { Input, Button, Slider } from '@nextui-org/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast, Toaster } from 'sonner';

const FeedBackSection: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [experience, setExperience] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/sendFeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, feedback, experience }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success('Feedback sent successfully!');
      setName('');
      setEmail('');
      setFeedback('');
      setExperience(3);
    } else {
      toast.error('Error sending feedback.');
    }
  };

  return (
    <div className="w-full max-w-[90%] h-[98vh] md:h-[80vh] mx-auto p-4 rounded-[40px] shadow-md flex flex-col md:flex-row bg-zinc-950 my-[10vh]">
      <Toaster position="top-center" />
      <div className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col justify-center items-center text-white md:ps-14 gap-10 md:gap-20">
        <div className='flex flex-col px-4 md:px-0 gap-4'>
          <h1 className='text-4xl my-4 self-start text-start w-full'>Help us improve our website!</h1>
          <p className='w-full self-start text-start'>We're always looking for ways to make our website better. Tell us what you think and how we can improve your experience.</p>
        </div>
        <div className='md:px-0 px-4 w-full'>
          <Slider
            size="lg"
            step={1}
            color="success"
            label="Your Experience"
            showSteps={true}
            maxValue={5}
            minValue={1}
            value={experience}
            onVolumeChange={(value : any) => setExperience(value)}
            className="max-w-md font-bold"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col justify-center items-center gap-4 bg-zink-800 rounded-lg">
        <Input
          type="text"
          placeholder="Enter your name"
          className="w-11/12 md:w-3/4 p-4 text-white"
          variant="underlined"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          className="w-11/12 md:w-3/4 p-4 text-white"
          variant="underlined"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <textarea
          className='w-11/12 md:w-3/4 h-[30%] md:h-2/5 p-2 rounded-md'
          name="feedback"
          id="feedback"
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
        ></textarea>
        <Button
          size={'lg'}
          variant="ghost"
          color='success'
          radius='full'
          className='self-end mr-4 md:mr-20 mt-4 text-xl font-bold hover:text-white'
          type="submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Submit'}
        </Button>   
      </form>
    </div>
  );
}

export default FeedBackSection;