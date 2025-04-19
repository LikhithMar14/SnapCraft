"use client";

import { Plus, Home, FolderOpen, CreditCard } from "lucide-react";

const Sidebar = () => {
  const handleCreateNewDesign = () => {
    console.log("Create new design");
  };

  return (
    <aside className="w-[72px] bg-[#f8f8fc] border-r flex flex-col items-center py-4 fixed left-0 top-0 h-full z-20">
      <div
        onClick={handleCreateNewDesign}
        className="flex flex-col items-center"
      >
        <button className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
          <Plus className="w-6 h-6" />
        </button>
        <div className="text-xs font-medium text-center mt-1 text-gray-700">
          Create
        </div>
      </div>
      <nav className="mt-8 flex flex-col items-center space-y-6 w-full">
        {[
          {
            icon: <Home className="h-6 w-6" />,
            label: "Home",
            active: true,
          },
          {
            icon: <FolderOpen className="h-6 w-6" />,
            label: "Projects",
            active: false,
          },
          {
            icon: <CreditCard className="h-6 w-6" />,
            label: "Billing",
            active: false,
          },
        ].map((menuItem, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-center w-full"
          >
            <div className="w-full flex flex-col items-center py-2 text-gray-600 hover:bg-gray-100 hover:text-purple-600">
              <div className="relative">{menuItem.icon}</div>
              <span className="text-xs font-medium mt-1">{menuItem.label}</span>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
