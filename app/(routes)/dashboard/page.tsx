import React from "react";
import Sidebar from "./components/Sidebar";
import Board from "./components/board";

const Dashboard = () => {
  return (
    <div className="w-full h-screen bg-[#131217] flex">
        <Sidebar/>
        <Board/>
    </div>
  )
}

export default Dashboard;