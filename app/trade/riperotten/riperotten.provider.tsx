"use client"
import { ParimutuelProvider } from "@/context/parimutuel";
import { SettingProvider } from "@/context/setting";
import React, { FC } from "react";

interface RiperottenProviderProps {
  children: React.ReactNode;
}

const RiperottenProvider: FC<RiperottenProviderProps> = ({ children }) => {
  return (
    <ParimutuelProvider>
      <SettingProvider>{children}</SettingProvider>
    </ParimutuelProvider>
  );
};

export { RiperottenProvider };
