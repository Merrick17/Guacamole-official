import Container from '@/components/common/container';
import EarnFooter from '@/components/common/earn-footer';
import EarnHeader from '@/components/common/earn-header';
import DynmaicVaultItem, {
  DynmaicVaultItemProps,
} from '@/components/views/earn/dynmaic-vault/dynmaic-vault-item';
import VaultItemsContainer from '@/components/views/earn/dynmaic-vault/vault-items-container';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dynamic Vault | Guacamole',
  description:
    'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
};

const Page = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] lg:min-w-[980px] w-max h-full">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg  px-6 py-5 bg-foreground shadow-md">
        <EarnHeader
          title="Dynamic Vaults"
          tutorialLink="https://docs.guacamole.gg/products-and-features/earn/dynamic-lending-vaults"
          hideSecondBtn
        />
        <hr className="border-dashed border-background" />
        <VaultItemsContainer />
        <EarnFooter />
      </div>
    </main>
  );
};

export default Page;
