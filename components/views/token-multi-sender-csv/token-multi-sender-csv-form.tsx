'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SelectToken } from '@/components/common/select-token';

interface TokenMultiSenderCsvFormProps {}

const TokenMultiSenderCsvForm: FC<TokenMultiSenderCsvFormProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedToken, setSelectedToken] = useState<any>(null);

  const onDropAccepted = useCallback((acceptedFiles: any) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
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
  function onSubmit() {
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

      <form onSubmit={onSubmit} className="space-y-6 pb-6">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Button className="w-full py-4 font-medium">
            Select File To Upload
          </Button>
        </div>
      </form>
    </>
  );
};

export default TokenMultiSenderCsvForm;
