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

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import UploadToken from "./upload-token";
import { uploadMetaData } from "@/lib/tokens/upload-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createSPLToken } from "@/lib/tokens/create-spl-token";
interface CreateSplTokenFormProps { }

const CreateSplTokenForm: FC<CreateSplTokenFormProps> = () => {
  // web 3
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { connection } = useConnection();
  const [createUrl, setCreateUrl] = useState<boolean>(true);
  // state
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [tokenAddresss, setTokenAddresss] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [error, setError] = useState<string>("");
  // 1- .
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
  const handleCreateMetadata = async () => {
    if (wallet.connected) {
      const uri = await uploadMetaData(
        wallet,
        connection,
        tokenIcon,
        form.getValues("tokenName"),
        form.getValues("description"),
        form.getValues("tokenSymbol")
      );
      form.setValue("metadataUrl", uri);
    } else {
      alert("You need to connect your wallet");
    }
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form STATE", form.formState.errors);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (!tokenIcon) return;
    if (createUrl) {
      const uri = await uploadMetaData(
        wallet,
        connection,
        tokenIcon,
        values.tokenName,
        values.description,
        values.description
      );

      const res = await createSPLToken(
        publicKey,
        wallet,
        connection,
        values.tokenSupply,
        values.tokenDecimals,
        values.authority,
        values.tokenName,
        values.tokenSymbol,
        uri,
        values.description,
        undefined,
        "url",
        setIsCreating,
        setTokenAddresss,
        setSignature,
        setError
      );
      console.log("Result", res);
    } else {
      const uri = await uploadMetaData(
        wallet,
        connection,
        tokenIcon,
        values.tokenName,
        values.description,
        values.description
      );

      const res = await createSPLToken(
        publicKey,
        wallet,
        connection,
        values.tokenSupply,
        values.tokenDecimals,
        values.authority,
        values.tokenName,
        values.tokenSymbol,
        values.metadataUrl,
        values.description,
        undefined,
        "url",
        setIsCreating,
        setTokenAddresss,
        setSignature,
        setError
      );
    }

    //console.log("Res", res)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 pb-6">
        <FormField
          control={form.control}
          name="tokenName"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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
        <div className=" flex flex-row items-center gap-4">
          <Button
            onClick={() => {
              setCreateUrl(true);
            }}
          >
            Create Metadata
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              setCreateUrl(false);
            }}
          >
            Use Existing URL
          </Button>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
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
        <FormField
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
                  <p className="font-medium text-sm ">
                    Enable Freeze Authority
                  </p>
                </label>
              </FormControl>
            </FormItem>
          )}
        />
        <hr className="border-dashed border-[#E5E7EB]" />
        <Button type="submit" className=" w-full">
          Create My Token
        </Button>
        <p className="text-center text-black/50 text-sm ">
          This interface makes creating your own SPL token easy! Make sure to
          follow the tutorial attached if this is your first time so that you
          understand all possible settings!
        </p>
      </form>

    </Form>
  );
};

export default CreateSplTokenForm;
