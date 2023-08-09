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
    <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5 border border-[#E5E7EB] shadow-md">
      <ToolHeader
        title="Create SPL Token"
        tutorialLink="https://docs.guacamole.gg/products-and-features/tools/create-spl-token"
      />
      <hr className="border-dashed border-[#E5E7EB]" />
      <CreateSplTokenForm />
    </div>
  );
};

export default CreateSplToken;
