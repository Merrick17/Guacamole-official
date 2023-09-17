import React, { useCallback, useEffect, useState } from 'react'
import Container from './container';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { BsChevronDown } from 'react-icons/bs';
import { SelectedCoin } from './SelectCoin';
import { Button } from '../ui/button';
import { dexterity, useProduct, useTrader } from '@/context/dexterity';
import { PublicKey } from '@solana/web3.js';
type SelectedCoinProps = {
    high: string;
    low: string;
    coin: string[];
    onClick?: () => void;
};
const PerceptualMarketHeader = () => {
    const { markPrice, indexPrice, setIndexPrice, setMarkPrice, selectedProduct } = useProduct()
    const { trader } = useTrader()
    const UNINITIALIZED = new PublicKey('11111111111111111111111111111111');

    const updatePrices = useCallback(async () => {
        if (trader) {
            for (const [productName, obj] of dexterity.Manifest.GetProductsOfMPG(trader.mpg)) {
                if (!productName.includes(selectedProduct.name)) {
                    continue;
                }
                const { index: productIndex, product } = obj;
                const meta = dexterity.productToMeta(product);
                if (meta.productKey.equals(UNINITIALIZED)) {
                    continue;
                }
                if (product.combo?.combo) {
                    continue;
                }

                await trader.updateMarkPrices()

                const index = Number(dexterity.Manifest.GetIndexPrice(trader.markPrices, meta.productKey));
                const mark = Number(dexterity.Manifest.GetMarkPrice(trader.markPrices, meta.productKey));

                console.log({ index, mark })

                setIndexPrice(index)
                setMarkPrice(mark)
            }
        }
    }, [trader, setIndexPrice, setMarkPrice, selectedProduct]); // Removed markPrice and indexPrice

    useEffect(() => {
        const intervalId = setInterval(() => {
            updatePrices();
        }, 500);

        return () => clearInterval(intervalId);
    }, [updatePrices]);
    const [SelectedProduct, setSelectedProduct] = useState<SelectedCoinProps>({
        high: '25,901.41',
        low: '25,534.37',
        coin: ['BTC', 'Bitcoin', 'PYTH:BTCUSD'],
    });
    return (
        <Container className="w-full flex justify-between items-center bg-background py-6 px-9">
            <div className="flex  flex-row items-center gap-3">
                <img
                    src="https://s3-alpha-sig.figma.com/img/06d4/7896/9aaaf2099933ebf7f9bdfbc97b0ce80b?Expires=1694995200&Signature=IP0TeXLpzWxKotY1t9R-3FG5w4HvgGEEWhmWP6iMtrP9NEW-NSACybcTW0d7cqqb~NvFLgoveDItaaiGScH8Fr9Hlq2j5oRzLqtKS09QKqK670363Sbb9BabbeX~SW6sjPDWOvfg9cN3~lVhtDTtWKU79H-6q2P4wqCkjdYlapZcpToEqMQQKyrcRJovMcZFKaOfFdWhZcDP0hw-osdjVJsgoIChxh~8vfz5VWwuBw7DNLdYTYUrHYpfiLsc4MfjDjgdWQHJwgG3Cev9xjp3HqmscAE4daTibQD2Zg~iPBw7~vkObBdufr5tqir3wVno~PEPrqtKtkMnB23BFSAbSw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt="bitcoin"
                    className="w-10 h-10"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
                        <SelectedCoin {...SelectedProduct} />
                        <Button size="icon">
                            <BsChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        <DropdownMenuItem>
                            <SelectedCoin
                                coin={['BTC', 'Bitcoin', 'PYTH:BTCUSD']}
                                high="25,901.41"
                                low="25,534.37"
                                onClick={() => {
                                    setSelectedProduct({
                                        high: '25,901.41',
                                        low: '25,534.37',
                                        coin: ['BTC', 'Bitcoin', 'PYTH:BTCUSD'],
                                    });
                                }}
                            />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SelectedCoin
                                coin={['ETH', 'Ethereum', 'PYTH:ETHUSD']}
                                high="25,901.41"
                                low="25,534.37"
                                onClick={() => {
                                    setSelectedProduct({
                                        high: '25,901.41',
                                        low: '25,534.37',
                                        coin: ['ETH', 'Ethereum', 'PYTH:ETHUSD'],
                                    });
                                }}
                            />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SelectedCoin
                                coin={['SOL', 'Solana', 'PYTH:SOLUSD']}
                                high="25,901.41"
                                low="25,534.37"
                                onClick={() => {
                                    setSelectedProduct({
                                        high: '25,901.41',
                                        low: '25,534.37',
                                        coin: ['SOL', 'Solana', 'PYTH:SOLUSD'],
                                    });
                                }}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className="text-[#8BD796] text-3xl font-medium">
                $25,620<span className="text-lg">.31</span>
            </p>
        </Container>
    )
}

export default PerceptualMarketHeader