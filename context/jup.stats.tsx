"use client"
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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

const JupStatsProvider = ({ children }) => {
  const [volumeByPairs, setVolumesByPairs] = useState<any[]>([]);
  const [topTokens, setTopTokens] = useState([]);
  const [topBuys, setTopBuys] = useState([]);
  const [topSells, setTopSells] = useState([]);

  const convertObjectToArray = (obj) => {
    return Object.keys(obj).map((key) => ({
      value: obj[key],
      name: key,
    }));
  };

  const initJupStat = useCallback(async () => {
    let isMounted = true;
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
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    initJupStat();
  }, [initJupStat]);

  return (
    <JupStatsContext.Provider
      value={{ volumeByPairs, topTokens, topBuys, topSells }}
    >
      {children}
    </JupStatsContext.Provider>
  );
};

const useJupStat = () => {
  return useContext(JupStatsContext);
};

export { JupStatsProvider, useJupStat };
