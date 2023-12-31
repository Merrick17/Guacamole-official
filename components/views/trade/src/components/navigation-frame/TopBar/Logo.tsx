import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="flex flex-row items-center">
      <Image width={40} height={40} alt="logo" src={'/images/logo.png'} />
    </div>
  );
};
