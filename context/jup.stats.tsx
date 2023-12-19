import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface JupStatsContextProps {
  volumeByPairs: any[];
  topTokens: any[];
  topBuys: any[];
  topSells: any[];
}

const JupStatsContext = createContext<JupStatsContextProps>({
  volumeByPairs: [],
  topTokens: [],
  topBuys: [],
  topSells: [],
});

const JupStatsProvider: React.FC = ({ children }: { children: any }) => {
  const [volumeByPairs, setVolumesByPairs] = useState<any[]>([]);
  const [topTokens, setTopTokens] = useState([]);
  const [topBuys, setTopBuys] = useState([]);
  const [topSells, setTopSells] = useState([]);

  const convertObjectToArray = (obj: any) =>
    Object.keys(obj).map((key) => ({
      value: obj[key],
      name: key,
    }));

  useEffect(() => {
    let isMounted = true;

    const initJupStat = async () => {
      try {
        const { data } = await axios.get(
          "https://tradingview.compendex.xyz/caching/"
        );
        if (data && data.success && isMounted) {
          const {
            lastXVolumeByAddresses,
            lastXTopTokens,
            lastXTopBuy,
            lastXTopSell,
          } = data.result;
          setVolumesByPairs(convertObjectToArray(lastXVolumeByAddresses));
          setTopTokens(lastXTopTokens);
          setTopBuys(lastXTopBuy);
          setTopSells(lastXTopSell);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    initJupStat();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <JupStatsContext.Provider
      value={{ volumeByPairs, topTokens, topBuys, topSells }}
    >
      {children}
    </JupStatsContext.Provider>
  );
};

const useJupStat = () => useContext(JupStatsContext);

export { JupStatsProvider, useJupStat };
