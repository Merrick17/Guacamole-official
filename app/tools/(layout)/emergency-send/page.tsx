import Container from '@/components/common/container';
import ToolHeader from '@/components/common/tool-header';
import EmergencySendForm from '@/components/views/tools/emergency-send/emergency-send-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Send To New Wallet | Guacamole',
  description:
    'Easily send everything from one Solana wallet to a new Solana wallet of your choice. This tool is useful if you suspect your wallet has been compromised.',
};
const EmergencySend = () => {
  return (
    <Container className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg px-6 py-5  shadow-md">
      <ToolHeader
        title="Emergency Send Tool"
        tutorialLink="https://docs.guacamole.gg/products-and-features/tools/emergency-send"
      />
      <hr className="border-dashed border-[#E5E7EB]" />
      <div className="text-muted-foreground text-sm font-normal">
        <p>
          This tool will send all tokens and NFTs in a wallet to a new address
          of your choice. This can be useful if you suspect your wallet has been
          compromised or if you`re just looking to utilize a new address!
        </p>
        <br />
        <p className="font-medium">Please use this tool with caution!</p>
      </div>
      <EmergencySendForm />
    </Container>
  );
};

export default EmergencySend;
