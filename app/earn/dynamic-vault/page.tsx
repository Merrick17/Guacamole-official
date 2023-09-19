import Container from '@/components/common/container';
import EarnFooter from '@/components/common/earn-footer';
import EarnHeader from '@/components/common/earn-header';
import DynmaicVaultItem, {
  DynmaicVaultItemProps,
} from '@/components/views/earn/dynmaic-vault/dynmaic-vault-item';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dynamic Vault | Guacamole',
  description:
    'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
};

const Page = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg  px-6 py-5 bg-foreground shadow-md">
        <EarnHeader
          title="Dynamic Vaults"
          tutorialLink="https://docs.guacamole.gg/products-and-features/tools/create-spl-token"
        />
        <hr className="border-dashed border-background" />
        <Container
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-0'
          )}
        >
          {dynamicVaultsData.map((item, index) => (
            <DynmaicVaultItem key={index} {...item} />
          ))}
        </Container>
        <EarnFooter />
      </div>
    </main>
  );
};

export default Page;

const dynamicVaultsData: DynmaicVaultItemProps[] = [
  {
    title: 'SOL Vault',
    image: '/icons/earn/sol.svg',
    walletBalance: '313 SOL',
    yourDeposit: '1.45 SOL',
    VirtualPrice: '1.04203564',
    TVL: '$755.07k',
    estimatedAPY: '3.13',
  },
  {
    title: 'SOL Vault',
    image: '/icons/earn/sol.svg',
    walletBalance: '313 SOL',
    yourDeposit: '1.45 SOL',
    VirtualPrice: '1.04203564',
    TVL: '$755.07k',
    estimatedAPY: '3.13',
  },
  {
    title: 'SOL Vault',
    image: '/icons/earn/sol.svg',
    walletBalance: '313 SOL',
    yourDeposit: '1.45 SOL',
    VirtualPrice: '1.04203564',
    TVL: '$755.07k',
    estimatedAPY: '3.13',
  },
  {
    title: 'SOL Vault',
    image: '/icons/earn/sol.svg',
    walletBalance: '313 SOL',
    yourDeposit: '1.45 SOL',
    VirtualPrice: '1.04203564',
    TVL: '$755.07k',
    estimatedAPY: '3.13',
  },
  {
    title: 'SOL Vault',
    image: '/icons/earn/sol.svg',
    walletBalance: '313 SOL',
    yourDeposit: '1.45 SOL',
    VirtualPrice: '1.04203564',
    TVL: '$755.07k',
    estimatedAPY: '3.13',
  },
  {
    title: 'SOL Vault',
    image: '/icons/earn/sol.svg',
    walletBalance: '313 SOL',
    yourDeposit: '1.45 SOL',
    VirtualPrice: '1.04203564',
    TVL: '$755.07k',
    estimatedAPY: '3.13',
  },
];
