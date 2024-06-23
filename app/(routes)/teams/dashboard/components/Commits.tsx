import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import { CircularProgress, DatePicker, Progress, Spinner, Tooltip } from '@nextui-org/react';
import { parseDate, CalendarDate } from '@internationalized/date';
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { ChevronLeft, ChevronRight, Code, Copy, GitBranch, UsersRound } from 'lucide-react';
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

const Commits: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [branch, setBranch] = useState<string>('main');
  const [user, setUser] = useState<string>('all');
  const [dateRange, setDateRange] = useState<CalendarDate | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const commitsPerPage = 10;

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
          owner: 'MaanasSehgal',
          repo: 'RTCT',
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
          owner: 'MaanasSehgal',
          repo: 'RTCT',
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

  useEffect(() => {
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
          headers: {
            'X-GitHub-Api-Version': string;
          };
        } = {
          owner: 'MaanasSehgal',
          repo: 'RTCT',
          sha: branch,
          page: currentPage,
          per_page: commitsPerPage,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        };
        if (user !== 'all') params.author = user;
        if (dateRange) params.since = new Date(dateRange.toString()).toISOString();

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
      } catch (err) {
        setError('Error fetching commits: either the repo does not exist or you do not have access to it.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [branch, user, dateRange, currentPage]);

  const [value, setValue] = React.useState(0);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((v) => (v >= 100 ? 0 : v + 10));
  //   }, 200);
  //
  //   return () => clearInterval(interval);
  // }, []);

  if (loading) return <Progress
    color='danger'
    size="sm"
    isIndeterminate
    aria-label="Loading..."
    className="w-full color-blue-500"
  />
  // <CircularProgress
  //   className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56'
  //   aria-label="Loading..."
  //   size="lg"
  //   value={value}
  //   color="success"
  //   showValueLabel={true}
  // />;
  if (error) return <div className="p-6">{error}</div>;

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
      <h1 className="text-3xl font-bold self-start  mb-4">Commits</h1>
      <div className="flex items-center justify-between mb-6">
        <div className='flex items-center space-x-2'>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="flex items-center w-[150px] bg-[#21262D] rounded-lg py-2 px-4 font-semibold">
              <GitBranch className="mr-2 h-4 w-4 text-white stroke-[3]" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#161B22] rounded-lg">
              {/* <SelectItem value={branches[0].name}></SelectItem> */}
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

        <DatePicker
          value={dateRange}
          onChange={(date) => setDateRange(date)}
          className="w-46 rounded-lg py-2 px-4"
        />
        {/* {dateRange && (
          <button
            onClick={() => setDateRange(null)}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
          >
            Clear Date
          </button>
        )} */}
      </div>

      <div className="space-y-4">
        {Object.keys(groupedCommits).map((date) => (
          <div key={date}>
            <h3 className="text-lg font-bold text-white">{date}</h3>
            <ol className="relative ms-6 border-s border-gray-700 mt-4">
              {groupedCommits[date].map((commit, index) => (
                <li key={index} className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-5 ring-8 ring-gray-900 ">
                    <Image className="rounded-full shadow-lg w-10 h-10" src={commit.author.avatar_url} alt={commit.author.login} width={10} height={10} />
                  </span>
                  <div className="items-center justify-between p-4 border-b-2 shadow-sm sm:flex h-20 overflow-hidden ms-4" style={{ backgroundColor: '#0D1117' }}>
                    <div className="text-md font-normal text-gray-500">
                      <Link target='_blank' href={`https://github.com/MaanasSehgal/RTCT/commit/${commit.sha}`} className='truncate text-wrap line-clamp-2 pe-4 text-white hover:text-[#4493F8] cursor-pointer'>{commit.commit.message}</Link>
                      <p><span className='bg-gray-800 p-1 rounded-lg'>{commit.author.login}</span> committed at {new Date(commit.commit.author.date).toLocaleString().substring(12)}</p>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0 text-gray-500">
                      <Tooltip content="View Commit">
                        <button
                          onClick={() => window.open(`https://github.com/MaanasSehgal/RTCT/commit/${commit.sha}`, '_blank')}
                          className="text-white px-2 py-1 rounded-lg hover:bg-gray-800"
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
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="text-blue-500 px-2 py-1 rounded-md hover:bg-gray-800 flex items-center"
        >
          <ChevronLeft className='h-6' /><p>Previous</p>
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-blue-500 px-2 py-1 rounded-md hover:bg-gray-800 flex items-center"
        >
          <p>Next</p><ChevronRight className='h-6' />
        </button>
      </div>
    </div>
  );
};

export default Commits;



{/* <ol className="relative border-s border-gray-200 border-gray-700">
        {commits.map((commit, index) => (
          <li key={index} className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white ring-gray-900 ">
              <img className="rounded-full shadow-lg" src={commit.author.avatar_url} alt={commit.author.login} />
            </span>
            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex h-20 overflow-hidden bg-[#0D1117]">
              <div className="text-sm font-normal text-gray-500">
                <p className='bg-gray-700 truncate text-wrap w-[80%] h-12 '>Desc: {commit.commit.message}</p>
                <p>{commit.author.login} committed at {new Date(commit.commit.author.date).toLocaleString()}</p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => window.open(`https://github.com/MaanasSehgal/react/commit/${commit.sha}`, '_blank')}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  {commit.sha.substring(0, 7)}
                </button>
                <button
                  onClick={() => copyToClipboard(commit.sha)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                >
                  <Copy />
                </button>
                <button
                  onClick={() => window.open(`https://github.com/MaanasSehgal/react/tree/${commit.sha}`, '_blank')}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                >
                  <Code />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol> */}