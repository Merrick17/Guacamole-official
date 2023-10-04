import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="bg-foreground px-10 py-3 flex flex-col lg:flex-row justify-between gap-4 text-mutebg-muted-foreground">
      <ul className="flex flex-col lg:flex-row lg:items-center gap-2 text-sm">
        <Link
          href="https://docs.guacamole.gg/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Documentation
        </Link>
        <div className="bg-muted-foreground rounded-xl w-1 h-1 lg:block hidden" />
        <Link
          href={
            'https://app.realms.today/dao/Ha56K8MGrJuiJSyK2UaYRpAf7Hu2BZw2XALEmW9EQemu'
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          Governance
        </Link>
        <div className="bg-muted-foreground rounded-xl w-1 h-1 lg:block hidden" />

        <Link
          href={
            'https://docs.guacamole.gg/informational-resources/privacy-policy'
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          Privacy Policy
        </Link>
        <div className="bg-muted-foreground rounded-xl w-1 h-1 lg:block hidden" />

        <Link
          href={
            'https://docs.guacamole.gg/informational-resources/cookies-policy'
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          Cookies Policy
        </Link>
        <div className="bg-muted-foreground rounded-xl w-1 h-1 lg:block hidden" />

        <Link
          href={
            'https://docs.guacamole.gg/informational-resources/terms-of-use'
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          Terms of Use
        </Link>
        <div className="bg-muted-foreground rounded-xl w-1 h-1 lg:block hidden" />

        <Link
          href={'https://docs.guacamole.gg/informational-resources/disclaimer'}
          rel="noopener noreferrer"
          target="_blank"
        >
          Disclaimer{' '}
        </Link>
      </ul>
      <div className="flex flex-row justify-center lg:items-center gap-8">
        <Link
          href={'https://x.com/guac_gg'}
          rel="noopener noreferrer"
          target="_blank"
          className="p-3 flex items-center justify-center rounded-lg bg-background"
        >
          <Image
            src="/images/footer/X.png"
            width={25}
            height={25}
            alt="follow on x"
          />
        </Link>
        <Link
          href={'https://t.me/guacgg'}
          rel="noopener noreferrer"
          target="_blank"
          className="p-3 flex items-center justify-center rounded-lg bg-background"
        >
          <Image
            src="/images/footer/telegram.png"
            width={25}
            height={25}
            alt="telegram"
          />
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={'https://discord.com/invite/MjdtaGXCVY'}
          className="p-3 flex items-center justify-center rounded-lg bg-background"
        >
          <Image
            src="/images/footer/discord.png"
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
