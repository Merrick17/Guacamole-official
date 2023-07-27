import { Links } from '@/config/links';
import { Logo } from '../views/trade/src/components/navigation-frame/TopBar/Logo';
import { Button } from './button';
import { GrClose } from 'react-icons/gr';
import MenuItem from './menu-item';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
export function DrawerMenu({ closeDrawer }: { closeDrawer: () => void }) {
  return (
    <div className={cn('fixed w-full h-full top-0 z-50 ')}>
      <div
        className=" fixed bg-black/50 w-screen h-screen cursor-pointer "
        onClick={closeDrawer}
      />

      <div className="relative h-full  w-full max-w-full md:max-w-md bg-white xs:w-80 ">
        <div className="flex items-center justify-between overflow-hidden px-4 py-3">
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className=" block text-2xl font-medium text-black">
              Guacamole
            </h1>
          </div>
          <Button
            title="Close"
            className="rounded-full aspect-square w-10 "
            variant="ghost"
            onClick={closeDrawer}
          >
            <GrClose className="h-full w-full" />
          </Button>
        </div>
        <div
          className="overflow-y-auto mt-2"
          style={{ height: 'calc(100% - 96px)' }}
        >
          <div className="px-6">
            {Links.map((item, index) => (
              <MenuItem
                key={item.name + index}
                name={item.name}
                href={item.href}
                Icon={item.Icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 right-0 z-10 w-full px-6">
          <WalletMultiButtonDynamic
            className="w-full flex items-center justify-center !rounded-lg"
            startIcon={undefined}
          />
        </div>
        d
      </div>
    </div>
  );
}
