import { FC } from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full p-6 rounded-lg backdrop:blur-sm bg-white border border-[#E5E7EB]">
      {children}
    </div>
  );
};

export default Container;
