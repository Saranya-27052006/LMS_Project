'use client';
import  { useState } from 'react';
import SideNavbar from '@/components/studentPage/sidenavbar';
import Courses from '@/components/studentPage/courses';
import Batches from '@/components/studentPage/batches';
import Meetings from '@/components/studentPage/meetings';
import Report from '@/components/studentPage/report';

export default function StudentPage() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Right side content */}
      <div className="flex-1 ml-64 p-10 bg-gray-100 min-h-screen overflow-y-auto">
        {activeTab === "courses" && <Courses />}
        {activeTab === "batches" && <Batches />}
        {activeTab === "meetings" && <Meetings />}
        {activeTab === "report" && <Report />}
      </div>
    </div>
  );
}
