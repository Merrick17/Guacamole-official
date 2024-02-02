import { Metadata } from "next";
import React from "react";
import { RiperottenProvider } from "./riperotten.provider";
export const metadata: Metadata = {
  title: "Bet On Quick Market Movements | Guacamole",

};
const layout = ({ children }) => {
  return <RiperottenProvider>{children}</RiperottenProvider>;
};

export default layout;
