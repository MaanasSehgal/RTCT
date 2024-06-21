import { RTCTLogo } from "@/components/Logos/Logos";
import { Settings2, Users } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-[#272A35]">
  <div>

    <div className="">
      <div className="px-2">

        <ul className="space-y-1 pt-4">
          <li>
            <a
              href="#"
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <Settings2/>

              <span
                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Project Configuration
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <Users/>

              <span
                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Team Management
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              

              <span
                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Commit Management
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <span
                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Account
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
    <form action="#">
      <button
        type="submit"
        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>

        <span
          className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
        >
          Logout
        </span>
      </button>
    </form>
  </div>
</div>
  )
}

export default Sidebar