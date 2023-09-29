import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface Candle {
  h: string;
  l: string;
  o: string;
  c: string;
  timestamp: Date;
}

interface Market {
  name: string;
  high: string;
  low: string;
  coin: string[];
  coinLogo: string;
}

interface WebSocketContextType {
  candles: Candle[];
  chartRef: React.MutableRefObject<any>;
  selectedMarket: Market | null;
  marketList: Market[];
  selectMarket: (market: Market | null) => void;
  updateMarketList: (newMarketList: Market[]) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider = ({ children }: { children: any }) => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>({
    name: "BTCUSD-PERP",
    high: "25,901.41",
    low: "25,534.37",
    coin: ["BTC", "Bitcoin", "HXRO:BTCUSD"],
    coinLogo: "/images/tokens/BTC.png",
  });
  const [marketList, setMarketList] = useState<Market[]>([
    {
      name: "BTCUSD-PERP",
      high: "25,901.41",
      low: "25,534.37",
      coin: ["BTC", "Bitcoin", "HXRO:BTCUSD"],
      coinLogo: "/images/tokens/BTC.png",
    },
    {
      name: "ETHUSD-PERP",
      high: "25,901.41",
      low: "25,534.37",
      coin: ["ETH", "Ethereum", "HXRO:ETHUSD"],
      coinLogo: "/images/tokens/ETH.png",
    },
    {
      name: "SOLUSD-PERP",
      high: "25,901.41",
      low: "25,534.37",
      coin: ["SOL", "Solana", "HXRO:SOLUSD"],
      coinLogo: "/images/tokens/SOL.png",
    },
    {
      name: "OPOS0D",
      high: "25,901.41",
      low: "25,534.37",
      coin: ["OPOS", "Only-possible-on-Solana", "HXRO:OPOS0D"],
      coinLogo: "/static/coins/opos-logo.png",
    },
  ]);

  const selectMarket = (market: Market | null) => {
    setSelectedMarket(market);
  };

  const updateMarketList = (newMarketList: Market[]) => {
    setMarketList(newMarketList);
  };

  const ws = useRef<WebSocket | null>(null);
  const chartRef = useRef<any>(null);
  const apiKey = "4031cf86-bfff-4483-a12d-7be0cd06769c-guac";

  useEffect(() => {
    if (selectedMarket) {
      ws.current = new WebSocket(
        `wss://hloc-dexterity.up.railway.app/${selectedMarket.name.toLowerCase()}?api-key=${apiKey}`
      );

      ws.current.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.candles) {
          setCandles(data.candles);
        }
      };

      ws.current.onopen = () => {
        ws.current?.send(
          JSON.stringify({ command: "stream", params: { newTime: "10_m" } })
        );
      };

      return () => {
        ws.current?.close();
        ws.current = null;
      };
    }
  }, [selectedMarket]);

  const contextValue = {
    candles,
    chartRef,
    selectedMarket,
    marketList,
    selectMarket,
    updateMarketList,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};
