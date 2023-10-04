"use client";
import { useRef, useState, useEffect } from "react";
const CustomTicker = ({ children }) => {
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef(null);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.style.animationPlayState = isPaused
        ? "paused"
        : "running";
    }
  }, [isPaused, tickerRef]);
  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      <div
        className="w-full min-w-full flex justify-between items-center gap-4 relative left-0 z-[1] animate-scroll-left"
        id="trending-tokens"
        ref={tickerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomTicker;
