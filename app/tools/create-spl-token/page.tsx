import ToolHeader from '@/components/common/tool-header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CreateSplTokenForm from '@/components/views/create-spl-token/create-spl-token-form';

const CreateSplToken = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
        <ToolHeader title="Create SPL Token" />
        <hr className="border-dashed border-[#E5E7EB]" />
        <CreateSplTokenForm />
      </div>
    </main>
  );
};

export default CreateSplToken;
