import Image from 'next/image';
import fida from '../../../assets/fida.svg';

export const Logo = () => {
  return (
    <div className="flex flex-row items-center">
      <Image width={40} height={40} alt="logo" src={'/images/logo.png'} />
      {/* <span className=" animate-text bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text  text-[24px] font-[700] capitalize text-black">
        Guacamole
      </span> */}
    </div>
  );
};
