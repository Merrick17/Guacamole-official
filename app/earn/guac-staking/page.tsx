import Container from '@/components/common/container';
import EarnHeader from '@/components/common/earn-header';
import GuacStakeForm from '@/components/views/earn/guac-stake/guac-stake-guac';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dynamic Vault | Guacamole',
  description:
    'Put your crypto to work for you in various ways and enjoy the fruit of its labor.',
};

const Page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-xl ">
      <div className=" mx-auto flex w-full  flex-col gap-6 rounded-lg bg-foreground px-6 py-5  shadow-md ">
        <EarnHeader
          title="Dynamic SOL Vault"
          tutorialLink="https://docs.guacamole.gg/products-and-features/tools/create-spl-token"
          hideSecondBtn
        />
        <hr className="border-dashed border-background" />
        <Container className="p-5 font-medium bg-background">
          <p className="text-muted-foreground text-sm">
            Projected Staking Yield
          </p>
          <h1 className="text-3xl">Coming Soon...</h1>
        </Container>
        <GuacStakeForm />
        <p className="text-xs text-muted-foreground">
          The new Guacamole staking option will allow token holders to stake
          their tokens to partake in associated &quot;AvocaDAO&quot; governance
          protocol voting. Users will receive an SPL token that represents their
          governance staking position. Fees generated by the Guacamole Protocol
          and other ecosystem integrations will supply rewards to token holders
          staking to participate in governance and other ecosystem activities.
          <br />
          <br />
          You will not need to claim these rewards for participating in
          governance staking. Rewards will be automatically distributed and when
          a token holder decides to unstake, their new balance will be reflected
          in the withdrawal amount from the contract.
          <br />
          <br />
          Please stay tuned for updates, initial proposals, and any changes to
          this system.
        </p>
      </div>
    </main>
  );
};

export default Page;
