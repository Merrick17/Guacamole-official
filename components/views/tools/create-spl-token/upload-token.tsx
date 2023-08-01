'use client';
import Image from 'next/image';
import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
type UploadTokenProps = {
  tokenIcon: File | null;
  setTokenIcon: (file: File | null) => void;
};
const UploadToken: FC<UploadTokenProps> = ({ tokenIcon, setTokenIcon }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setTokenIcon(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full border border-[#E5E7EB] min-h-[70px] text-sm font-medium rounded-lg relative"
    >
      {!tokenIcon ? (
        <div>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Upload A Token Icon</p>
          )}
        </div>
      ) : (
        <div>
          <Image
            src={URL.createObjectURL(tokenIcon)}
            width="50"
            height="50"
            alt="token icon"
          />
        </div>
      )}
    </div>
  );
};

export default UploadToken;
