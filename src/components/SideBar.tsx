import React from "react";

interface SidebarItemProps {
  label: string;
  icon: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon }) => (
  <div className="flex items-center gap-2 text-white p-2 hover:bg-gray-700 cursor-pointer">
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <aside className="bg-gray-900 text-white w-64 p-4 flex flex-col">
    <div className="text-2xl font-bold mb-4">Lotru</div>
    {children}
  </aside>
);
