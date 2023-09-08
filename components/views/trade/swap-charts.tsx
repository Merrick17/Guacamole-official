'use client';
import Container from '@/components/common/container';
import CoinChart from './coin-chart';
import { useSearchParams } from 'next/navigation';
import {
  INPUT_MINT_ADDRESS,
  OUTPUT_MINT_ADDRESS,
} from './src/components/Jupiter';

const SwapCharts = () => {
  const searchParams = useSearchParams();

  const CustomInputMintAddress =
    searchParams.get('inputMint') ?? INPUT_MINT_ADDRESS;
  const CustomOutputMintAddress =
    searchParams.get('outputMint') ?? OUTPUT_MINT_ADDRESS;
  return (
    <Container className="py-10 px-14 flex flex-col gap-10">
      <CoinChart coinMint={CustomInputMintAddress} />
      <CoinChart coinMint={CustomOutputMintAddress} />
    </Container>
  );
};

export default SwapCharts;
