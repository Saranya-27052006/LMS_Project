"use client";

import {
    BookOpenIcon,
    UserGroupIcon,
    VideoCameraIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface SideNavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function SideNavbar({ activeTab, setActiveTab }: SideNavbarProps) {
    const menuItems = [
        { name: "courses", icon: <BookOpenIcon className="w-5 h-5" />, label: "Courses" },
        { name: "batches", icon: <UserGroupIcon className="w-5 h-5" />, label: "Batches" },
        { name: "meetings", icon: <VideoCameraIcon className="w-5 h-5" />, label: "Meetings" },
        { name: "report", icon: <DocumentTextIcon className="w-5 h-5" />, label: "Report" },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col shadow-xl fixed h-full">
                <div className="text-3xl font-extrabold mb-10 tracking-wide text-center">
                    Dashboard
                </div>

                <ul className="space-y-4">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${activeTab === item.name
                                ? "bg-gray-700 shadow-inner border-l-4 border-primary"
                                : "hover:bg-gray-700 hover:shadow-lg"
                                }`}
                        >
                            {item.icon} {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
