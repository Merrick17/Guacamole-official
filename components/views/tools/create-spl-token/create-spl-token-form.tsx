"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  tokenName: z.string().min(2, {
    message: "token name must be at least 2 characters.",
  }),
  tokenSymbol: z.string().min(2, {
    message: "token symbol must be at least 2 characters.",
  }),
  tokenDecimals: z.number().min(2, {
    message: "token decimals must be at least 2 .",
  }),
  tokenSupply: z.number().min(1, {
    message: "token supply must be at least 2 .",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
  metadataUrl: z.string().optional(),
  authority: z.boolean(),
});

import Container from "@/components/common/container";
import { useToast } from "@/hooks/use-toast";
import { createSPLToken } from "@/lib/tokens/create-spl-token";
import { uploadMetaData } from "@/lib/tokens/upload-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import UploadToken from "./upload-token";
import { useTokenAccounts } from "@bonfida/hooks";
import { PublicKey, Transaction } from "@solana/web3.js";
import { createTransferCheckedInstruction } from "../../../../node_modules/@solana/spl-token";
import { getTokenAccount } from "@/lib/get-ata";
import numeral from "numeral";
import { Loader2 } from "lucide-react";
interface CreateSplTokenFormProps {}

const CreateSplTokenForm: FC<CreateSplTokenFormProps> = () => {
  // web 3
  const wallet = useWallet();
  const { publicKey, connected } = wallet;
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { data: tokenAccounts, refresh: refreshToken } = useTokenAccounts(
    connection,
    publicKey
  );
  const guacTokenAccount = tokenAccounts
    ? tokenAccounts?.getByMint(
        new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR")
      )
    : null;
  const guacBalance =
    guacTokenAccount && guacTokenAccount.decimals
      ? Number(guacTokenAccount.account.amount) /
        Math.pow(10, guacTokenAccount.decimals)
      : 0;
  const handleSendFees = async () => {
    const { pubkey: feeGuacAta } = await getTokenAccount(
      connection,
      new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"),
      publicKey,
      new PublicKey("EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC"),
      true
    );
    return createTransferCheckedInstruction(
      guacTokenAccount.pubkey, // from (should be a token account)
      new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"), // mint
      feeGuacAta, // to (should be a token account)
      publicKey, // from's owner
      10_000_000 * Math.pow(10, 5), // amount, if your deciamls is 8, send 10^8 for 1 token
      5 // decimals
    );
  };

  const [tokenIcon, setTokenIcon] = useState<File | null>(null);
  // 2- form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenName: "",
      tokenSymbol: "",
      tokenDecimals: 0,
      tokenSupply: 0,
      description: "",
      metadataUrl: "",
      authority: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (!tokenIcon) {
      throw new Error("You need to add image ");
    }

    try {
      setIsLoading(true);
      let uri: string;
     
      // Assuming metadataUrl is used when createUrl is false
      uri = await uploadMetaData(
        wallet,
        connection,
        tokenIcon,
        values.tokenName,
        values.description,
        values.tokenSymbol
      );
      // Ensure that uri is available before proceeding with createSPLToken
      if (uri) {
        const feeIx = await handleSendFees(); 
        const res = await createSPLToken(
          publicKey,
          wallet,
          connection,
          values.tokenSupply,
          values.tokenDecimals,
          values.tokenName,
          values.tokenSymbol,
          uri,
          values.description,
          feeIx
        );

        toast({
          variant: "success",
          title: "Success",
          description: (
            <div className="flex flex-col gap-2">
              <p>Token Created !</p>
              <Link
                href={`https://solscan.io/tx/${res}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
              >
                View on solscan
              </Link>
            </div>
          ),
        });
      } else {
        // Handle the case when the URL is not available.

        toast({
          variant: "destructive",
          title: "Error",
          description: "URL is not available",
        });
      }
    } catch (error) {
      console.log("Errr", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 pb-6">
        <FormField
          control={form.control}
          name="tokenName"
          render={({ field }) => (
            <FormItem className="border-[1px] border-[rgba(168, 168, 168, 0.10)]">
              <FormLabel className="uppercase">Token Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insert Token Name (ex. Guacamole}"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokenSymbol"
          render={({ field }) => (
            <FormItem className="border-[1px] border-[rgba(168, 168, 168, 0.10)]">
              <FormLabel className="uppercase">Token SYMBOL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Choose Token Symbol (ex. GUAC)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokenSupply"
          render={({ field }) => (
            <FormItem className="border-[1px] border-[rgba(168, 168, 168, 0.10)]">
              <FormLabel className="uppercase">
                Number Of Tokens To Mint
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokenDecimals"
          render={({ field }) => (
            <FormItem className="border-[1px] border-[rgba(168, 168, 168, 0.10)]">
              <FormLabel className="uppercase">Number of decimals</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* {!createUrl && (
          <FormField
            control={form.control}
            name="metadataUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase">Metadata URL</FormLabel>
                <FormControl>
                  <Input placeholder="Url" {...field} disabled={createUrl} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}
        {/* <div className=" flex flex-row items-center gap-4">
          <Button
            onClick={() => {
              setCreateUrl(true);
            }}
          >
            Create Metadata
          </Button>
          <Button
            variant={'secondary'}
            onClick={() => {
              setCreateUrl(false);
            }}
          >
            Use Existing URL
          </Button>
        </div> */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="border-[1px] border-[rgba(168, 168, 168, 0.10)]">
              <FormLabel className="uppercase">Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add a Description for the token"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadToken tokenIcon={tokenIcon} setTokenIcon={setTokenIcon} />
        <div className="flex p-3 border-[1px] border-[rgba(168, 168, 168, 0.10)] flex-col w-full bg-background min-h-[70px] text-sm font-medium rounded-lg relative text-muted-foreground ">
          <div className="flex justify-between w-full ">
            <span className="text-[#FCFCFC] uppercase text-[12px] font-[400]">
              TOKEN CREATON FEE
            </span>
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1 items-center">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.27539 10H9.77539V2.5H8.21289V0H2.27539C1.23963 0 0.400391 0.839235 0.400391 1.875V8.125C0.400391 9.16073 1.23963 10 2.27539 10ZM8.52539 3.75V8.75H2.27539C1.92994 8.75 1.65039 8.47046 1.65039 8.125V3.64078C1.8512 3.7128 2.06237 3.74943 2.27539 3.75004L8.52539 3.75ZM2.27539 1.25H6.96289V2.5H2.27539C1.92994 2.5 1.65039 2.22045 1.65039 1.875C1.65039 1.52955 1.92994 1.25 2.27539 1.25Z"
                    fill="#A8A8A8"
                    fill-opacity="0.5"
                  />
                </svg>
                <span className="text-xs text-muted-foreground">
                  {" "}
                  {numeral(guacBalance).format("0,0.000")}
                </span>
              </div>

              <Button className="bg-[#141414] text-[#8BD796] w-full h-7 p-2 rounded-lg text-xs">
                <Link
                  href={`/trade/swap?outputMint=AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR&inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`}
                  className="text-[#BBB0DB]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BUY GUAC
                </Link>
              </Button>
            </div>
          </div>
          <span className="text-[#A8A8A8] text-[14px] font-[400]">
            10,000,000 GUAC + Standard Solana Network Fees
          </span>
        </div>
        {/* <FormField
          control={form.control}
          name="authority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Update authority</FormLabel>
              <FormControl>
                <label className="flex items-center gap-2 cursor-pointer selection:bg-transparent">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <p className="font-medium text-sm text-muted-foreground ">
                    Enable Freeze Authority
                  </p>
                </label>
              </FormControl>
            </FormItem>
          )}
        /> */}
        <Button
          type="submit"
          className="launch-bg w-full"
          disabled={!connected || guacBalance < 10_000_000 || isLoading}
        >
          {!isLoading ? " Fill In Applicable Fields" : <Loader2 />}
        </Button>
        {/* <p className="text-center text-muted-foreground text-sm ">
          This interface makes creating your own SPL token easy! Make sure to
          follow the tutorial attached if this is your first time so that you
          understand all possible settings!
        </p> */}
        <Container className="bg-[#0F0F0F] hover:border-[#D77668]  relative flex-col gap-[17px] flex p-[25px] overflow-hidden border-[1px] border-[rgba(168, 168, 168, 0.10)] ">
          <Image
            src="/images/launch/bg/nocode.gif"
            width={300}
            height={302}
            alt="guac background"
            className="-z-0 absolute rotate-[30deg] top-[-30px]  sm:translate-x-[60%]  opacity-30  "
          />
          <div className="flex flex-col gap-4 z-30">
            <h1>Token Creation Guide</h1>
            <p className="text-[#A8A8A8] text-[14px] w-[349px]">
              Excited to create your own token and need some guidance? We have
              you covered.
            </p>
            <Link href={""} className="flex items-start  gap-2">
              <span className="text-[#D77668] text-[16px]">
                Click Here To Learn More
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="mt-1"
              >
                <g clip-path="url(#clip0_3130_506)">
                  <path
                    d="M10.0003 7.33317V10.5552C10.0004 10.6574 9.98035 10.7586 9.94128 10.853C9.90222 10.9474 9.84491 11.0332 9.77265 11.1055C9.70039 11.1778 9.61459 11.2351 9.52016 11.2741C9.42573 11.3132 9.32452 11.3333 9.22233 11.3332H1.44499C1.23865 11.3332 1.04077 11.2512 0.894863 11.1053C0.74896 10.9594 0.666992 10.7615 0.666992 10.5552V2.77784C0.666905 2.67564 0.686969 2.57444 0.726036 2.48001C0.765103 2.38557 0.822406 2.29977 0.894668 2.22751C0.966929 2.15525 1.05273 2.09795 1.14716 2.05888C1.24159 2.01981 1.3428 1.99975 1.44499 1.99984H4.52366M7.48833 0.666504H11.3337V4.51184M6.07433 5.92584L11.2597 0.740504"
                    stroke="#D77668"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3130_506">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </Container>
      </form>
    </Form>
  );
};

export default CreateSplTokenForm;
