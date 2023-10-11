'use client';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

type TransitionContextValue = {
  openTransition: boolean;
  setOpenTransition: React.Dispatch<React.SetStateAction<boolean>>;
  startPageTransition: (path?: string) => void;
  runPreloader: () => void;
  openPreloader: boolean;
};
const transitionContext = createContext<TransitionContextValue>({
  openTransition: false,
  setOpenTransition: () => {},
  startPageTransition: (path?: string) => {},
  runPreloader: () => {},
  openPreloader: true,
});
export default transitionContext;

const TransitionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openTransition, setOpenTransition] = useState(false);
  const [openPreloader, setOpenPreloader] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const startPageTransition = (path?: string) => {
    if (path === pathname) return;
    setOpenTransition(true);
    setTimeout(() => {
      if (path) {
        window.scrollTo(0, 0);
        router.push(path);
      }
    }, 1000);
  };

  const runPreloader = () => {
    setOpenPreloader(false);
  };

  const value = {
    openTransition,
    setOpenTransition,
    startPageTransition,
    runPreloader,
    openPreloader,
  };

  return (
    <transitionContext.Provider value={value}>
      {children}
    </transitionContext.Provider>
  );
};
const useTransitionContext = () => {
  const context = useContext(transitionContext);
  if (context === undefined) {
    throw new Error(
      'useTransition must be used within a TransitionContextProvider'
    );
  }
  return context;
};
export { TransitionContextProvider, useTransitionContext };
