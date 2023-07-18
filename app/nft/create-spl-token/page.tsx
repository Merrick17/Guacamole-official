import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CreateSplTokenForm from '@/components/views/create-spl-token/create-spl-token-form';

const CreateSplToken = () => {
  return (
    <main className="container mx-auto flex flex-col gap-14 px-16 py-12 max-w-[1440px]  ">
      <div className=" mx-auto flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white px-6 py-5">
        <header className="flex flex-row items-center justify-between  capitalize">
          <h1 className="font-medium text-base text-[#4B5563]">
            Create SPL Token
          </h1>
          <Button>View Tutorial</Button>
        </header>
        <hr className="border-dashed border-[#E5E7EB]" />
        <CreateSplTokenForm />
      </div>
    </main>
  );
};

export default CreateSplToken;
