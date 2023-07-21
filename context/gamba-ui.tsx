import { createContext, useContext, useState } from 'react';
import { GambaUiProps } from '../components/views/play/Provider';
import { RecentPlayEvent } from 'gamba';
import { useRecentPlays } from '@/hooks/useRecentPlays';

interface GambaUiState extends GambaUiProps {
  tos?: JSX.Element;
  modal: boolean;
  recentPlays: RecentPlayEvent[];
  setModal: (modal: boolean) => void;
}

export const GambaUiContext = createContext<GambaUiState>(null!);

export function useGambaUi() {
  const store = useContext(GambaUiContext);
  if (!store) {
    throw new Error('Missing GambaUiProvider');
  }
  return store;
}

export function GambaUiProvider({
  children,
  ...props
}: React.PropsWithChildren<GambaUiProps>) {
  const [modal, setModal] = useState(false);
  const recentPlays = useRecentPlays();

  return (
    <GambaUiContext.Provider value={{ modal, setModal, recentPlays, ...props }}>
      {children}
    </GambaUiContext.Provider>
  );
}
