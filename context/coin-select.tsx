import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for your market
interface Market {
    name: string;
    high: string;
    low: string;
    coin: string[];
    coinLogo: string; // Assuming coinLogo is a URL to an image
}

// Define the context type
interface MarketContextType {
    selectedMarket: Market | null;
    marketList: Market[];
    selectMarket: (market: Market | null) => void;
    updateMarketList: (newMarketList: Market[]) => void;
}

// Create a context for managing markets
const MarketContext = createContext<MarketContextType | undefined>(undefined);

// Custom hook to access the market context
export const useMarketContext = () => {
    const context = useContext(MarketContext);
    if (!context) {
        throw new Error("useMarketContext must be used within a MarketProvider");
    }
    return context;
};

// MarketProvider component to wrap your app
interface MarketProviderProps {
    children: ReactNode;
}

export function MarketProvider({ children }: MarketProviderProps) {
    // Define state for selectedMarket and marketList
    const [selectedMarket, setSelectedMarket] = useState<Market | null>({
        name: "BTCUSD-PERP",
        high: "25,901.41",
        low: "25,534.37",
        coin: ["BTC", "Bitcoin", "PYTH:BTCUSD"],
        coinLogo: "/images/tokens/BTC.png",
    });
    const [marketList, setMarketList] = useState<Market[]>([
        {
            name: "BTCUSD-PERP",
            high: "25,901.41",
            low: "25,534.37",
            coin: ["BTC", "Bitcoin", "PYTH:BTCUSD"],
            coinLogo: "/images/tokens/BTC.png",
        },
        {
            name: "ETHUSD-PERP",
            high: '25,901.41',
            low: '25,534.37',
            coin: ['ETH', 'Ethereum', 'PYTH:ETHUSD'],
            coinLogo: "/images/tokens/ETH.png"
        },
        {
            name: "SOLUSD-PERP",
            high: '25,901.41',
            low: '25,534.37',
            coin: ['SOL', 'Solana', 'PYTH:SOLUSD'],
            coinLogo: "/images/tokens/SOL.png"
        }
    ]);

    // Define functions to update the state
    const selectMarket = (market: Market | null) => {
        setSelectedMarket(market);
    };

    const updateMarketList = (newMarketList: Market[]) => {
        setMarketList(newMarketList);
    };

    // Create a context value object with state and functions
    const contextValue: MarketContextType = {
        selectedMarket,
        marketList,
        selectMarket,
        updateMarketList,
    };

    // Wrap the app with the context provider
    return (
        <MarketContext.Provider value={contextValue}>
            {children}
        </MarketContext.Provider>
    );
}
