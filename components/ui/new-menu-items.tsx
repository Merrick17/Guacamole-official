"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NewMenuItems() {
  return (
    <NavigationMenu className="ml-1">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-[#0F0F0F] focus:bg-[#0F0F0F] hover:border hover:border-[rgba(168, 168, 168, 0.10)] focus:border focus:border-[rgba(168, 168, 168, 0.10)]">
            Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-start items-start lg:min-w-[750px] gap-2 p-4 md:w-[500px] w-full">
              <div>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full  select-none flex-col justify-center rounded-md bg-[#0F0F0F] border  p-2 no-underline outline-none focus:shadow-md relative overflow-hidden w-[188px] min-h-[270px]"
                    href="/explore"
                  >
                    <div className="flex flex-col justify-center items-start gap-1">
                      <Image
                        src={"/images/themes/green.png"}
                        width={40}
                        height={40}
                        alt="green"
                        className="my-1"
                      />
                      <span className="text-[#FCFCFC] text-[18px]">
                        Explore
                      </span>
                      <span className="text-[#A8A8A8] text-[12px]">
                        Explore Guacamole and the greater Solana ecosystem.
                      </span>
                    </div>
                    <Image
                      src="/images/menu/explore.png"
                      alt="guac background"
                      className="-z-0 absolute opacity-5  top-0 right-0 bottom-0 "
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Link>
                </NavigationMenuLink>
              </div>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/terminal"
                  title="Solana Data Terminal"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    {" "}
                    Explore Solana like never before with our in-depth data
                    terminal.
                  </span>
                </ListItem>
                <ListItem
                  href="https://app.realms.today/dao/Ha56K8MGrJuiJSyK2UaYRpAf7Hu2BZw2XALEmW9EQemu/treasury/v2y"
                  title="The AvocaDAO"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                  target="_blank"
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Learn more about Guacamole’s DAO governance and revenue
                    sources.
                  </span>
                </ListItem>
                <ListItem
                  href="/explore/shop"
                  title="Earn Claimable Rewards"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px]"
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Earn and redeem rewards for interacting with our ecosystem.
                  </span>
                </ListItem>
              </ul>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/explore/guac-token"
                  title="The GUAC Token"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Learn about the dynamics of the GUAC token and integrations.
                  </span>
                </ListItem>
                <ListItem
                  href="/explore/avotars"
                  title="Avotar Collection"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    A gateway to features, loyalty programs, and unique
                    benefits.
                  </span>
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent  hover:bg-[#0F0F0F] focus:bg-[#0F0F0F] hover:border hover:border-[rgba(168, 168, 168, 0.10)] focus:border focus:border-[rgba(168, 168, 168, 0.10)]">
            Trade
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-start items-start lg:min-w-[750px] gap-2 p-4 md:w-[500px] w-full">
              <div>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex   select-none flex-col justify-center rounded-md bg-[#0F0F0F] border  p-2 no-underline outline-none focus:shadow-md relative overflow-hidden w-[188px] h-[263px]"
                    href={"/trade"}
                  >
                    <div className="flex flex-col justify-center items-start gap-1">
                      <Image
                        src={"/images/themes/violet.png"}
                        width={40}
                        height={40}
                        alt="green"
                        className="my-1"
                      />
                      <span className="text-[#FCFCFC] text-[18px]">Trade</span>
                      <span className="text-[#A8A8A8] text-[12px]">
                        Trade, swap, bridge, and buy in just a few clicks.
                      </span>
                    </div>
                    <Image
                      src="/images/menu/trade.png"
                      alt="guac background"
                      className="-z-0 absolute opacity-5  top-0 right-0 bottom-0 "
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Link>
                </NavigationMenuLink>
              </div>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/trade/swap"
                  title="Swap Aggregator"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Explore Solana like never before with our in-depth data
                    terminal.
                  </span>
                </ListItem>
                <ListItem
                  href="/trade/perpetuals"
                  title="Crypto Futures"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Use margin to trade gamified perpetual futures markets.
                  </span>
                </ListItem>
                <ListItem
                  href="/trade/buyandsell"
                  title="Buy & Use Crypto"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Providing simple ways to onboard or spend funds in the real
                    world.
                  </span>
                </ListItem>
              </ul>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/trade/riperotten"
                  title="Ripe Or Rotten"
                  className="bg-[#0F0F0F] border    w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Bet your SOL and GUAC on market movement in action packed
                    rounds.
                  </span>
                </ListItem>

                <ListItem
                  href="/trade/bridge"
                  title="Bridge Swap"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Bridge tokens from other chains like ETH, BNB, AVAX, & more
                    to Solana.
                  </span>
                </ListItem>
                <ListItem
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  title="Peer To Peer Swaps"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] opacity-50"
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Safely swap tokens and NFTs in a peer to peer setting.
                  </span>
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent  hover:bg-[#0F0F0F] focus:bg-[#0F0F0F] hover:border hover:border-[rgba(168, 168, 168, 0.10)] focus:border focus:border-[rgba(168, 168, 168, 0.10)]">
            Earn
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-start items-start lg:min-w-[750px] gap-2 p-4 md:w-[500px] w-full">
              <div>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex   select-none flex-col justify-center rounded-md bg-[#0F0F0F] border  p-2 no-underline outline-none focus:shadow-md relative overflow-hidden w-[188px] h-[263px]"
                    href={"/earn"}
                  >
                    <div className="flex flex-col justify-center items-start gap-1">
                      <Image
                        src={"/images/themes/orange.png"}
                        width={40}
                        height={40}
                        alt="green"
                        className="my-1"
                      />
                      <span className="text-[#FCFCFC] text-[18px]">Earn</span>
                      <span className="text-[#A8A8A8] text-[12px]">
                        Put your crypto to work for you and enjoy the fruit with
                        no labor.
                      </span>
                    </div>
                    <Image
                      src="/images/menu/earn.png"
                      alt="guac background"
                      className="-z-0 absolute opacity-5  top-0 right-0 bottom-0 "
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Link>
                </NavigationMenuLink>
              </div>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/earn/liquidity-staking"
                  title="Liquid Solana Staking"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Stake your Solana in liquid staking protocols to utilize in
                    DeFi.
                  </span>
                </ListItem>
                <ListItem
                  href="/earn/guac-staking"
                  title="GUAC Staking Options"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    View available staking options and integrations for the GUAC
                    token.
                  </span>
                </ListItem>
                <ListItem
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  title="Lending Aggregator"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] opacity-50 "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    View and interact with several lending protocols in one
                    place.
                  </span>
                </ListItem>
              </ul>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/earn/dynamic-vault"
                  title="Dynamic Lending Vaults"
                  className="bg-[#0F0F0F] border    w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Automatically rebalancing lending vaults to offset protocol
                    risk.
                  </span>
                </ListItem>

                <ListItem
                  href="/earn/tokenized-nft-farm"
                  title="Tokenized NFT Farms"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Stake tokens to receive randomized NFTs out of supported
                    pools.
                  </span>
                </ListItem>
                <ListItem
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  title="Liquidity Pools"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] opacity-50"
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Supply liquidity in aggregated pools to earn trading fees
                    and rewards.
                  </span>
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent  hover:bg-[#0F0F0F] focus:bg-[#0F0F0F] hover:border hover:border-[rgba(168, 168, 168, 0.10)] focus:border focus:border-[rgba(168, 168, 168, 0.10)]">
            Play
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-start items-start lg:min-w-[750px] gap-2 p-4 md:w-[500px] w-full">
              <div>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex   select-none flex-col justify-center rounded-md bg-[#0F0F0F] border  p-2 no-underline outline-none focus:shadow-md relative overflow-hidden w-[188px] h-[263px]"
                    href={"/play"}
                  >
                    <div className="flex flex-col justify-center items-start">
                      <Image
                        src={"/images/themes/yellow.png"}
                        width={40}
                        height={40}
                        alt="green"
                        className="my-1"
                      />
                      <span className="text-[#FCFCFC] text-[18px]">Play</span>
                      <span className="text-[#A8A8A8] text-[12px]">
                        Put your crypto to work for you and enjoy the fruit with
                        no labor.
                      </span>
                    </div>
                    <Image
                      src="/images/menu/play.png"
                      alt="guac background"
                      className="-z-0 absolute opacity-5  top-0 right-0 bottom-0 "
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Link>
                </NavigationMenuLink>
              </div>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/play/dice"
                  title="Dice"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Adjust your slider, take a chance, and roll the dice.
                  </span>
                </ListItem>
                <ListItem
                  href="/play/flip"
                  title="Flip"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Bet on a simple coin toss. Will it be heads or tails?
                  </span>
                </ListItem>
                <ListItem
                  href="/play/mines"
                  title="Mines"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Set your difficulty and navigate the mine field.
                  </span>
                </ListItem>
                <ListItem
                  href="/play/plinko"
                  title="Plinko"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Drop a chip down a peg-filled board in this physics-based
                    game.
                  </span>
                </ListItem>
              </ul>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/play/slots"
                  title="Slots"
                  className="bg-[#0F0F0F] border    w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Pull the lever and test your luck. Will you win the jackpot?
                  </span>
                </ListItem>
                <ListItem
                  href="/play/hilo"
                  title="Hilo"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Will the next number be lower or higher? Try to keep your
                    streak!
                  </span>
                </ListItem>
                <ListItem
                  href="/play/roulette"
                  title="Roulette"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Place your chips and spin the wheel! Are you a fan of red or
                    black?
                  </span>
                </ListItem>
                <ListItem
                  href="/play/wheel"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  title="Wheel"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] opacity-50"
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Take a spin and behold as the wheel determines your fate.
                  </span>
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent  hover:bg-[#0F0F0F] focus:bg-[#0F0F0F] hover:border hover:border-[rgba(168, 168, 168, 0.10)] focus:border focus:border-[rgba(168, 168, 168, 0.10)]">
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-start items-start lg:min-w-[750px] gap-2 p-4 md:w-[500px] w-full">
              <div>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex   select-none flex-col justify-center rounded-md bg-[#0F0F0F] border  p-2 no-underline outline-none focus:shadow-md relative overflow-hidden w-[188px] h-[263px]"
                    href={"/tools"}
                  >
                    <div className="flex flex-col justify-center items-start">
                      <Image
                        src={"/images/themes/white.png"}
                        width={40}
                        height={40}
                        alt="green"
                        className="my-1"
                      />
                      <span className="text-[#FCFCFC] text-[18px]">Tools</span>
                      <span className="text-[#A8A8A8] text-[12px]">
                        A list of tools focused on cleaning up your crypto
                        portfolio.
                      </span>
                    </div>
                    <Image
                      src="/images/menu/tools.png"
                      alt="guac background"
                      className="-z-0 absolute opacity-5  top-0 right-0 bottom-0 "
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Link>
                </NavigationMenuLink>
              </div>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/tools/burn-nft-token"
                  title="Burn NFTs"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Burn worthless and “rugged” NFTs to receive SOL back from
                    rent accounts.
                  </span>
                </ListItem>
                <ListItem
                  href="/tools/close-token-accounts"
                  title="Close Token Accounts"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Close old token accounts to receive SOL back from rent
                    accounts.
                  </span>
                </ListItem>
                <ListItem
                  href="/tools/token-multi-sender-csv"
                  title="Airdrop via CSV"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Send tokens to addresses via an uploadable .csv template.
                  </span>
                </ListItem>
              </ul>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/tools/burn-spl-token"
                  title="Burn SPL Tokens"
                  className="bg-[#0F0F0F] border    w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Burn worthless SPL tokens to receive SOL back from rent
                    accounts.
                  </span>
                </ListItem>
                <ListItem
                  href="/tools/token-multi-sender"
                  title="Use Multi-Sender"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px]"
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Easily send tokens to several different Solana wallets at
                    one time.
                  </span>
                </ListItem>
                <ListItem
                  href="/tools/emergency-send"
                  title="Emergency Send"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Fear that your wallet may be compromised? Move it fast!
                  </span>
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent  hover:bg-[#0F0F0F] focus:bg-[#0F0F0F] hover:border hover:border-[rgba(168, 168, 168, 0.10)] focus:border focus:border-[rgba(168, 168, 168, 0.10)]">
            Launch
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-start items-start lg:min-w-[750px] gap-2 p-4 md:w-[500px] w-full">
              <div>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex   select-none flex-col justify-center rounded-md bg-[#0F0F0F] border  p-2 no-underline outline-none focus:shadow-md relative overflow-hidden w-[188px] h-[263px]"
                    href="/launch"
                  >
                    <div className="flex flex-col justify-center items-start">
                      <Image
                        src={"/images/themes/red.png"}
                        width={40}
                        height={40}
                        alt="green"
                        className="my-1"
                      />
                      <span className="text-[#FCFCFC] text-[18px]">Launch</span>
                      <span className="text-[#A8A8A8] text-[12px]">
                        A variety of no-code tools to make your token launch
                        easier.
                      </span>
                    </div>
                    <Image
                      src="/images/menu/launch.png"
                      alt="guac background"
                      className="-z-0 absolute opacity-5  top-0 right-0 bottom-0 "
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Link>
                </NavigationMenuLink>
              </div>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/launch/token-creator?active=1"
                  title="No-Code Token Creator"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Easily create your own SPL or Token Extension in just a few
                    clicks.
                  </span>
                </ListItem>
                <ListItem
                  href="/launch/token-creator?active=2"
                  title="Token Manager"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Manage token details, authorities, and tokenomics.
                  </span>
                </ListItem>
                <ListItem
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  title="Launch Tokenized NFT Farm"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] opacity-50"
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Create your own Tokenized NFT farm to reward token stakers
                    with NFTs.
                  </span>
                </ListItem>
              </ul>
              <ul className="gap-2 flex flex-col">
                <ListItem
                  href="/launch/lock"
                  title="Liquidity Lockers"
                  className="bg-[#0F0F0F] border    w-[251px] "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Lock your liquidity tokens to build trust while growing your
                    project.
                  </span>
                </ListItem>
                <ListItem
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  title="Token Vesting"
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] opacity-50"
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Setup time-based vesting and lock contracts for any SPL
                    token.
                  </span>
                </ListItem>
                <ListItem
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] opacity-50 "
                >
                  <span className="text-[12px] text-[#A8A8A8] font-[400] ">
                    Create liquidity pools and farms on Guacamole and other
                    protocols.
                  </span>
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent  hover:bg-[#0F0F0F] focus:bg-[#0F0F0F] hover:border hover:border-[rgba(168, 168, 168, 0.10)] focus:border focus:border-[rgba(168, 168, 168, 0.10)]">
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-full gap-2 p-4 md:w-[500px] md:grid-cols-3 lg:min-w-[750px]">
              <li className="row-span-3 ">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full  select-none flex-col justify-center rounded-md bg-[#0F0F0F] border  p-2 no-underline outline-none focus:shadow-md relative overflow-hidden w-[188px]"
                    href="/"
                  >
                    <div className="flex flex-col justify-center items-start">
                      <Image
                        src={"/images/themes/green.png"}
                        width={40}
                        height={40}
                        alt="green"
                        className="my-1"
                      />
                      <span className="text-[#FCFCFC] text-[18px]">
                        Explore
                      </span>
                      <span className="text-[#A8A8A8] text-[12px]">
                        Explore Guacamole and the greater Solana ecosystem.
                      </span>
                    </div>
                    <Image
                      src="/images/home/bg.png"
                      alt="guac background"
                      className="-z-0 absolute opacity-5  top-0 right-0 bottom-0 "
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/docs"
                title="Solana Data Terminal"
                className="bg-[#0F0F0F] border  text-[12px] col-span-3 w-[251px] ml-[-40px] hover:border-primary hover:bg-[#0F0F0F]"
              >
                Explore Solana like never before with our in-depth data
                terminal.
              </ListItem>
              <ListItem
                href="/docs/installation"
                title="Ecosystem Resources"
                className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] ml-[-20px]"
              >
                Explore Guacamole resources available for the greater ecosystem.
              </ListItem>
              <ListItem
                href="/docs/primitives/typography"
                title="The GUAC Token"
                className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] ml-[-40px]"
              >
                Learn about the dynamics of the GUAC token and integrations.
              </ListItem>

              <ListItem
                href="/docs/installation"
                title="The AvocaDAO"
                className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] ml-[-20px]"
              >
                Learn more about Guacamole’s DAO governance and revenue sources.
              </ListItem>
              <ListItem
                href="/docs"
                title="Avotar Collection"
                className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] ml-[-40px]"
              >
                A gateway to features, loyalty programs, and unique benefits
              </ListItem>
              <ListItem
                href="/docs/primitives/typography"
                title="Earn Claimable Rewards"
                className="bg-[#0F0F0F] border text-[12px] col-span-3  w-[251px] ml-[-20px]"
              >
                Earn and redeem rewards for interacting with our ecosystem.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#0F0F0F]hover:text-accent-foreground focus:bg-[#0F0F0F] focus:text-accent-foreground hover:border focus:border hover:border-primary focus:border-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
