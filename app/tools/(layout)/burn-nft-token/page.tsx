import Container from "@/components/common/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BurnNftToken from "@/components/views/tools/burn-nft-token";
import BurnSplToken from "@/components/views/tools/burn-spl-token";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Burn NFTs And Tokens For SOL | Guacamole",
  
};
const Page = () => {
  return (
    <Container className="bg-foreground mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-lg px-6 py-5  shadow-md border">
      <Tabs defaultValue="account" className="w-full min-w-[700px]">
        <TabsList>
          <TabsTrigger value="account">NFT</TabsTrigger>
          <TabsTrigger value="password">SPL TOKENS</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <BurnNftToken />
        </TabsContent>
        <TabsContent value="password">
          {" "}
          <BurnSplToken />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Page;
