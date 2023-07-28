'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import Papa from 'papaparse';

import { FC, FormEvent, FormEventHandler, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SelectToken } from '@/components/common/select-token';
import { useToast } from '@/components/ui/use-toast';

interface TokenMultiSenderCsvFormProps {}

const TokenMultiSenderCsvForm: FC<TokenMultiSenderCsvFormProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const { toast } = useToast();

  const onDropAccepted = useCallback(async (acceptedFiles: any) => {
    // Do something with the files
    await Papa.parse(acceptedFiles[0], {
      header: true,
      complete: function (results) {
        const data = results.data;
        const keys = Object.keys(data[0]);
        if (
          !keys.includes('address') ||
          !keys.includes('token') ||
          !keys.includes('amout') ||
          keys.length !== 3
        ) {
          toast({
            title: 'Invalid CSV file',
            description:
              'Please select a valid CSV file with the following headers: address, token, amount',
            variant: 'destructive',
          });
        } else {
          setFile(acceptedFiles[0]);
        }
      },
    });
  }, []);
  const onDropRejected = useCallback((fileRejections: any) => {
    // Do something with the files
    console.error('please select only one file of type CSV');
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDropAccepted,
    onDropRejected,
    accept: { 'text/csv': ['.csv'] },
  });

  // 2. Define a submit handler.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      console.log('No file selected');
      return;
    }
  }

  return (
    <>
      <SelectToken
        handleSelect={(token: any) => setSelectedToken(token)}
        selectedToken={selectedToken}
      />

      <form onSubmit={(e) => onSubmit(e)} className="space-y-6 pb-6">
        {!file ? (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <Button type="button" className="w-full py-4 font-medium">
              Select File To Upload
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 lg:flex lg:flex-row lg:justify-between lg:gap-4 ">
            <Button
              type="button"
              variant="destructive"
              className="w-full py-4 font-medium capitalize"
              onClick={() => setFile(null)}
            >
              remove file
            </Button>
            <Button
              type="submit"
              className="w-full py-4 font-medium capitalize"
            >
              apply
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default TokenMultiSenderCsvForm;
