import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import { Button, CircularProgress, DatePicker, DateRangePicker, Progress, Spinner, Tooltip } from '@nextui-org/react';
import { today, getLocalTimeZone } from '@internationalized/date';
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarX2, ChevronLeft, ChevronRight, CircleAlert, Code, Copy, GitBranch, GitCommitHorizontal, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  };
}

interface Branch {
  name: string;
}

interface User {
  login: string;
  avatar_url: string;
}

const Commits = ({data}:any) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [branch, setBranch] = useState<string>('main');
  const [user, setUser] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const commitsPerPage = 10;

  const owner = data.githubRepo.split('/')[3];
  const repo = data.githubRepo.split('/')[4];

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
          owner: owner,
          repo: repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        setBranches(response.data);
      } catch (err) {
        console.error('Error fetching branches', err);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
          owner: owner,
          repo: repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        setUsers(response.data.map((user: any) => ({
          login: user.login,
          avatar_url: user.avatar_url
        })));
      } catch (err) {
        console.error('Error fetching users', err);
      }
    };

    fetchBranches();
    fetchUsers();
  }, []);

  const fetchCommits = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: {
        owner: string;
        repo: string;
        sha?: string;
        page?: number;
        per_page?: number;
        author?: string;
        since?: string;
        until?: string;
        headers: {
          'X-GitHub-Api-Version': string;
        };
      } = {
        owner: owner,
        repo: repo,
        sha: branch,
        page: currentPage,
        per_page: commitsPerPage,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      };
      if (user !== 'all') params.author = user;
      if (dateRange.start) params.since = dateRange.start.toISOString();
      if (dateRange.end) params.until = dateRange.end.toISOString();

      const response = await octokit.request('GET /repos/{owner}/{repo}/commits', params);
      const commits = response.data.map((commit: any) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: {
          login: commit.author ? commit.author.login : 'Unknown',
          avatar_url: commit.author ? commit.author.avatar_url : 'https://via.placeholder.com/150'
        },
        url: commit.html_url,
        commit: commit.commit
      }));
      setCommits(commits);
      setHasNextPage(commits.length === commitsPerPage);
    } catch (err) {
      setError('Unable to retrieve commits: The repository may not exist, or you may not have the necessary access permissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
  }, [branch, user, dateRange, currentPage]);

  const handleOnBackClick = () => {
    dateRange.start = null;
    dateRange.end = null;
    fetchCommits();
  };

  if (loading) return <Progress
    color='danger'
    size="sm"
    isIndeterminate
    aria-label="Loading..."
    className="w-full color-blue-500"
  />
  if (error) return( 
    <div className='w-full h-full flex justify-center items-center'>
      <Button className='mx-auto w-[80vw] h-auto text-center text-xl py-10 font-semibold rounded-[20px]' color="danger" variant="bordered">
        <div className='w-full text-center break-words whitespace-normal'>
          <CircleAlert className="inline-block mr-2 align-middle" /> 
          <span className='align-middle'>{error}</span>
        </div>
      </Button>
    </div>)

  if(commits.length === 0) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <GitCommitHorizontal size={40} strokeWidth={1}/>
          <h2 className='text-3xl font-bold'>No Commits history</h2>
          <p className='text-center text-lg text-zinc-400'>There isn't any commit history to show here</p>
          <Button onClick={() => {handleOnBackClick()}} color="success" variant="flat" className='hover:bg-green-900 text-white'>
            <p className='text-white text-lg font-bold'>Back to commits</p>
          </Button> 
        </div>
      </div>
    )
  }


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("SHA copied to clipboard!")
  };

  const groupCommitsByDate = (commits: Commit[]) => {
    return commits.reduce((acc: { [key: string]: Commit[] }, commit: Commit) => {
      const date = new Date(commit.commit.author.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(commit);
      return acc;
    }, {});
  };

  const groupedCommits = groupCommitsByDate(commits);

  return (
    <div className="p-6 bg-[#0D1117] h-full overflow-y-auto">
      <h1 className="text-3xl font-bold self-start mb-4">Commits</h1>
      <div className="flex items-center justify-between gap-6 flex-col md:flex-row mb-6">
        <div className='flex items-center space-x-2'>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="flex items-center w-[150px] bg-[#21262D] rounded-lg py-2 px-4 font-semibold">
              <GitBranch className="mr-2 h-4 w-4 text-white stroke-[3]" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#161B22] rounded-lg">
              {branches.map((branch) => (
                <SelectItem key={branch.name} value={branch.name}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={user} onValueChange={setUser}>
            <SelectTrigger className="flex items-center w-[150px] bg-[#21262D] rounded-lg py-1 px-2 font-semibold">
              <UsersRound className="h-4 w-4 text-white stroke-[3]" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='bg-[#161B22] rounded-lg'>
              <SelectItem value="all">All Users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.login} value={user.login}>
                  {user.login}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`text-zinc-200 px-2 py-1 rounded-md hover:bg-gray-700 bg-[#21262D] flex items-center disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ChevronLeft className='h-6' />
        </button>
        <button
          disabled={!hasNextPage}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`text-zinc-200 px-2 py-1 rounded-md hover:bg-gray-700 bg-[#21262D] flex items-center disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ChevronRight className='h-6' />
        </button>
      </div>
        <div className='flex flex-col '>
          {dateRange.start && dateRange.end && (
            <div className="bg-neutral-800 z-10 rounded-lg p-2 text-center">{dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}</div>
          )}
        <DateRangePicker
          maxValue={today(getLocalTimeZone())}
          onChange={(range) => {
            const startDate = range.start ? new Date(range.start.year, range.start.month - 1, range.start.day) : null;
            const endDate = range.end ? new Date(range.end.year, range.end.month - 1, range.end.day+1) : null;
            // console.log(startDate, endDate);
            setDateRange({ start: startDate, end: endDate });
            
          }}
          className="w-46 rounded-lg py-2 px-4 mt-4 md:mt-0"
        />
        {dateRange.start && dateRange.end && (
          <Button
            color="danger" variant="ghost"
            onClick={() => setDateRange({ start: null, end: null})}
            className="flex gap-2 bg-[#161B22] w-24 px-2 py-1 rounded-lg mt-4 mr-4 md:mt-0 self-end font-semibold text-lg"
          >
          <CalendarX2/>Clear 
          </Button>
        )}
        </div>
      </div>

      <div className="space-y-4">
        {Object.keys(groupedCommits).map((date) => (
          <div key={date}>
            <h3 className="text-lg font-bold text-white">{date}</h3>
            <ol className="relative ms-6 border-s border-gray-700 mt-4">
              {groupedCommits[date].map((commit, index) => (
                <li key={index} className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center rounded-full -start-5 ring-8 ring-gray-900 ">
                    <Image className="rounded-full shadow-lg w-12 h-12" src={commit.author.avatar_url} alt={commit.author.login} width={200} height={200} />
                  </span>

                  <div className="items-center justify-between p-4 border-b-2 shadow-sm sm:flex  overflow-hidden ms-4" style={{ backgroundColor: '#0D1117' }}>
                    <div className="text-md font-normal text-gray-500">
                      <Link target='_blank' href={`https://github.com/MaanasSehgal/RTCT/commit/${commit.sha}`} className='truncate text-wrap line-clamp-2 pe-4 text-white hover:text-[#4493F8] cursor-pointer'>{commit.commit.message}</Link>
                      <p><span className='bg-gray-800 p-1 rounded-lg'>{commit.author.login}</span> committed at {new Date(commit.commit.author.date).toLocaleString().substring(12)}</p>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0 text-gray-500">
                      <Tooltip content="View Commit">
                        <button
                          onClick={() => window.open(`https://github.com/MaanasSehgal/RTCT/commit/${commit.sha}`, '_blank')}
                          className="text-white px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800"
                        >
                          {commit.sha.substring(0, 7)}
                        </button>
                      </Tooltip>
                      <Tooltip content="Copy SHA">
                        <button
                          onClick={() => copyToClipboard(commit.sha)}
                          className="px-2 py-1 rounded-lg hover:bg-gray-800"
                        >
                          <Copy />
                        </button>
                      </Tooltip>
                      <Tooltip content="View Code">
                        <button
                          onClick={() => window.open(`https://github.com/MaanasSehgal/RTCT/tree/${commit.sha}`, '_blank')}
                          className="px-2 py-1 rounded-lg hover:bg-gray-800"
                        >
                          <Code />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commits;
