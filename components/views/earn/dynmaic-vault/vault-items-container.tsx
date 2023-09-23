'use client';
import Container from '@/components/common/container';
import { cn } from '@/lib/utils';
import DynmaicVaultItem, { DynmaicVaultItemProps } from './dynmaic-vault-item';
import useVaultInfo from '@/hooks/use-vault-info';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const VaultItemsContainer = () => {
  const { data, isLoading, error } = useVaultInfo();

  useEffect(() => {}, [isLoading]);
  return (
    <Container
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-0 '
      )}
    >
      {!isLoading
        ? data &&
          data.length > 0 &&
          data.map((item, index) => (
            <DynmaicVaultItem key={index} item={item} />
          ))
        : Array.from({ length: 7 }).map((_, index) => (
            <Skeleton
              key={index}
              className="py-4 px-5 border border-transparent bg-background rounded-lg hover:border-primary transition-colors duration-500 ease-in-out text-center w-full min-w-[300px] h-[400px]"
            />
          ))}
    </Container>
  );
};

export default VaultItemsContainer;
