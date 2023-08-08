import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="border-t-[1px] broder-[#E5E7EB99] bg-[#F0FDF4] px-10 py-3 flex flex-col lg:flex-row justify-between gap-4">
      <ul className="flex flex-col lg:flex-row lg:items-center gap-2 text-sm">
        <li>Documentation</li>
        <div className="bg-black rounded-xl w-1 h-1 lg:block hidden" />
        <li>Governance</li>
        <div className="bg-black rounded-xl w-1 h-1 lg:block hidden" />

        <li>Privacy Policy</li>
        <div className="bg-black rounded-xl w-1 h-1 lg:block hidden" />

        <li>Cookies Policy</li>
        <div className="bg-black rounded-xl w-1 h-1 lg:block hidden" />

        <li>Terms of Use</li>
        <div className="bg-black rounded-xl w-1 h-1 lg:block hidden" />

        <li>Disclaimer </li>
      </ul>
      <div className="flex flex-row justify-center lg:items-center gap-8">
        <Link
          href={'#'}
          className="p-3 flex items-center justify-center rounded-lg bg-white border border-[#E5E7EB]"
        >
          <Image
            src="/images/info/follow.png"
            width={25}
            height={25}
            alt="follow on x"
          />
        </Link>
        <Link
          href={'#'}
          className="p-3 flex items-center justify-center rounded-lg bg-white border border-[#E5E7EB]"
        >
          <Image
            src="/images/info/telegram.png"
            width={25}
            height={25}
            alt="telegram"
          />
        </Link>
        <Link
          href={'#'}
          className="p-3 flex items-center justify-center rounded-lg bg-white border border-[#E5E7EB]"
        >
          <Image
            src="/images/info/discord.png"
            width={25}
            height={25}
            alt="discord"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
