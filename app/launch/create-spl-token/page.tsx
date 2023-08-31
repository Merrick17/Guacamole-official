import Container from '@/components/common/container';
import ToolHeader from '@/components/common/tool-header';
import CreateSplTokenForm from '@/components/views/tools/create-spl-token/create-spl-token-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Solana SPL Token | Guacamole',
  description:
    'Easily create your own SPL token on the Solana network with this easy to use no-code interface on Guacamole. Connect your wallet, enter your parameters, and mint your tokens!',
};
const CreateSplToken = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <Container className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg px-6 py-5  shadow-md">
        <ToolHeader
          title="Create SPL Token"
          tutorialLink="https://docs.guacamole.gg/products-and-features/tools/create-spl-token"
        />
        <hr className="border-dashed border-[#E5E7EB]" />
        <CreateSplTokenForm />
      </Container>
    </main>
  );
};

export default CreateSplToken;
