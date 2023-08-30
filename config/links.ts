import { IconType } from 'react-icons';
import routes from './routes';
import {
  GoHome,
  GoArrowSwitch,
  GoHourglass,
  GoTools,
  GoInfo,
} from 'react-icons/go';
export const Links: {
  name: string;
  href: string;
  Icon: IconType;

  dropdownItems?: {
    name: string;
    href: string;
    disabled?: boolean;
  }[];
}[] = [
  {
    name: 'Home',
    href: routes.home,
    Icon: GoHome,
  },
  {
    name: 'Trade',
    href: routes.trade.root,
    Icon: GoArrowSwitch,
    dropdownItems: [
      {
        name: 'Swap',
        href: routes.trade.root,
      },
      {
        name: 'DCA / TWAP',
        href: '',
        disabled: true,
      },
      {
        name: 'Limit',
        href: '',
        disabled: true,
      },
      {
        name: 'Liquidity',
        href: '',
        disabled: true,
      },
      {
        name: 'Bridge',
        href: '',
        disabled: true,
      },
    ],
  },
  {
    name: 'Earn',
    href: routes.earn.root,
    Icon: GoHourglass,
    dropdownItems: [
      {
        name: 'Explore Ways To Earn',
        href: routes.earn.explore,
      },
      {
        name: 'Token For NFT Staking',
        href: routes.earn.dynamicVault,
        disabled: true,
      },
      {
        name: 'NFT Staking Pools',
        href: routes.earn.statistics,
        disabled: true,
      },
      {
        name: 'GUAC Staking',
        href: routes.earn.statistics,
        disabled: true,
      },
      {
        name: 'Liquidity Farming',
        href: routes.earn.statistics,
        disabled: true,
      },
    ],
  },

  {
    name: 'Play',
    href: routes.play.root,
    Icon: GoHourglass,
    dropdownItems: [
      {
        name: 'Explore All Games',
        href: routes.play.explore,
      },
      {
        name: 'Roulette',
        href: routes.play.roulette,
      },
      {
        name: 'Slots',
        href: routes.play.slots,
      },
      {
        name: 'HiLo',
        href: routes.play.hilo,
      },
      {
        name: 'Mines',
        href: routes.play.mines,
      },
    ],
  },

  {
    name: 'Tools',
    href: routes.tools.root,
    Icon: GoTools,

    dropdownItems: [
      {
        name: 'Explore All Tools',
        href: routes.tools.root,
      },
      {
        name: 'Create Your Own Token',

        href: routes.tools.createSplToken,
      },
      {
        name: 'Multi-Sender & Airdrops',

        href: routes.tools.tokenMultiSender,
      },
      {
        name: 'Burn Unwanted NFTs',

        href: routes.tools.burnNftToken,
      },
      {
        name: 'Burn Unwanted Tokens',

        href: routes.tools.burnSplToken,
      },
      {
        name: 'Close Token Accounts',
        href: routes.tools.closeTokenAccounts,
      },
      {
        name: 'Emergency Send All',
        href: routes.tools.emergencySend,
      },
    ],
  },
  {
    name: 'Info',
    href: routes.info.root,
    Icon: GoInfo,
  },
];
