import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import { DatePicker } from '@nextui-org/react';
import { parseDate, CalendarDate } from '@internationalized/date';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Code, Copy, GitBranch, UsersRound } from 'lucide-react';
import Image from 'next/image';


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
          owner: 'facebook',
          repo: 'react',
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
          owner: 'facebook',
          repo: 'react',
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
          owner: 'facebook',
          repo: 'react',
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
        setError('Error fetching commits');
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [branch, user, dateRange, currentPage]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">{error}</div>;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('SHA copied to clipboard!');
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
    <div className="p-6 bg-[#0D1117]">
      <div className="flex items-center justify-between mb-6">
        <div className='flex items-center space-x-2'>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="flex items-center w-[180px] bg-[#21262D] rounded-lg py-2 px-4">
              <GitBranch className="mr-2 h-4 w-4 text-white" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="main">Main</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.name} value={branch.name}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={user} onValueChange={setUser}>
            <SelectTrigger className="flex items-center w-[180px] bg-[#21262D] rounded-lg py-2 px-4">
              <UsersRound className="mr-2 h-4 w-4 text-white" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
          // placeholder="Select Date"
          className="w-46 rounded-lg py-2 px-4"
        />
        {dateRange && (
          <button
            onClick={() => setDateRange(null)}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
          >
            Clear Date
          </button>
        )}
      </div>

      <div className="space-y-4">
        {Object.keys(groupedCommits).map((date) => (
          <div key={date}>
            <h3 className="text-lg font-bold text-white">{date}</h3>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
              {groupedCommits[date].map((commit, index) => (
                <li key={index} className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 ">
                    <Image className="rounded-full shadow-lg w-10 h-10" src={commit.author.avatar_url} alt={commit.author.login} width={20} height={20} />
                  </span>
                  <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex h-20 overflow-hidden bg-[#0D1117]">
                    <div className="text-sm font-normal text-gray-500">
                      <p className='bg-gray-700 truncate text-wrap w-[80%] h-12 '>Desc: {commit.commit.message}</p>
                      <p>{commit.author.login} committed at {new Date(commit.commit.author.date).toLocaleString()}</p>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => window.open(`https://github.com/facebook/react/commit/${commit.sha}`, '_blank')}
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
                        onClick={() => window.open(`https://github.com/facebook/react/tree/${commit.sha}`, '_blank')}
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        <Code />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Commits;



{/* <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {commits.map((commit, index) => (
          <li key={index} className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 ">
              <img className="rounded-full shadow-lg" src={commit.author.avatar_url} alt={commit.author.login} />
            </span>
            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex h-20 overflow-hidden bg-[#0D1117]">
              <div className="text-sm font-normal text-gray-500">
                <p className='bg-gray-700 truncate text-wrap w-[80%] h-12 '>Desc: {commit.commit.message}</p>
                <p>{commit.author.login} committed at {new Date(commit.commit.author.date).toLocaleString()}</p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => window.open(`https://github.com/facebook/react/commit/${commit.sha}`, '_blank')}
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
                  onClick={() => window.open(`https://github.com/facebook/react/tree/${commit.sha}`, '_blank')}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                >
                  <Code />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol> */}