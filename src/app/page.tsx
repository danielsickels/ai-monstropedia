"use client";

import { useState } from "react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MonsCard from "./components/MonsCard";

export default function Home() {
  const [selectedMonster, setSelectedMonster] = useState<number>(0);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

  const handleToggleMenu = () => setShowSideMenu((prev) => !prev);
  const handleCloseMenu = () => setShowSideMenu(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-screen overflow-y-auto">
        <SideNav 
          selectedMonster={selectedMonster} 
          setSelectedMonster={setSelectedMonster} 
          handleCloseMenu={handleCloseMenu} 
          showSideMenu={showSideMenu} 
        />
      </div>
      <div className="flex-1 min-w-0">
        <Header handleToggleMenu={handleToggleMenu} />
        <div className="flex justify-center items-center min-h-screen">
          <MonsCard selectedMonster={selectedMonster} />
        </div>
      </div>
    </div>
  );
}
