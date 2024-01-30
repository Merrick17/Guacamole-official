import LaunchHeader from "@/components/common/LaunchHeader";
import Container from "@/components/common/container";
import ToolHeader from "@/components/common/tool-header";
import CreateExtensionTokenForm from "@/components/views/tools/create-extensions-token/create-extension-token-form";
import CreateSplTokenForm from "@/components/views/tools/create-spl-token/create-spl-token-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Own SPL Token | Guacamole",
  description:
    "Create your own SPL token on Solana in just two minutes using our no-code creation interface. No need to interact with the Solana CLI, just fill in your token details and create your token!",
  openGraph: {
    images: ["images/seo/launch.png"],
  },
};
const CreateSplToken = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12   max-w-[1440px]">
      <Container className=" mx-auto flex w-full max-w-lg flex-col gap-6 bg-forground rounded-lg px-6 py-5 bg-foreground shadow-md">
        {/* <ToolHeader
          title="Create SPL Token"
          tutorialLink="https://docs.guacamole.gg/products-and-features/tools/create-spl-token"
        />
        <hr className="border-dashed border-[#E5E7EB]" /> */}
        <LaunchHeader tutorialLink="https://docs.guacamole.gg/products-and-features/tools/create-spl-token" />
        <CreateExtensionTokenForm />
      </Container>
    </main>
  );
};

export default CreateSplToken;
