'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadToken = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full border border-[#E5E7EB] min-h-[70px] text-sm font-medium rounded-lg"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Upload A Token Icon</p>
      )}
    </div>
  );
};

export default UploadToken;
