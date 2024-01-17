export interface Product {
    index: number,
    exponent: number,
    priceTrim: number,
    minSize: number,
    name: string,
    base: string,
    quote: string,
    baseLogo: string,
    quoteLogo: string,
    mapType: 'num' | 'str'
}

export interface Group {
    productsIndex: number, 
    pubkey: string,
    name: string
}

export const GroupPubkeyMap = new Map<number, Group>([
    [0, {productsIndex: 0, pubkey: "LSTqd6kXfMcMmVj63TdFfXvwSEYSkQVcT6GrwH4Ki3h", name: 'StakeChip'}],
    [1, {productsIndex: 1, pubkey: "4cKB5xKtDpv4xo6ZxyiEvtyX3HgXzyJUS1Y8hAfoNkMT", name: 'BlueChip'}],
])

export const ProductMap = new Map<number, Map<string | number, Product>>([
    [0, new Map<string | number, Product>([
        ['SOLUSD-PERP', {
            index: 0, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'SOLUSD-PERP', base: 'SOL', quote: 'USDC',
            baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'str'
        }],
        ['JSOLUSD-PERP', {
            index: 1, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'JSOLUSD-PERP', base: 'SOL', quote: 'USDC',
            baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'str'
        }],
        ['MSOLUSD-PERP', {
            index: 2, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'MSOLUSD-PERP', base: 'SOL', quote: 'USDC',
            baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'str'
        }],
        [0, {
            index: 0, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'SOLUSD-PERP', base: 'SOL', quote: 'USDC',
            baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'num'
        }],
        [1, {
            index: 1, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'JSOLUSD-PERP', base: 'SOL', quote: 'USDC',
            baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'num'
        }],
        [2, {
            index: 2, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'MSOLUSD-PERP', base: 'SOL', quote: 'USDC',
            baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'num'
        }],
    ])],
    [1, new Map<string | number, Product>([
        ['BTCUSD-PERP', {
            index: 0, exponent: 4, minSize: 0.0001, priceTrim: 1, name: 'BTCUSD-PERP', base: 'BTC', quote: 'USDC',
            baseLogo: '/static/coins/bitcoin.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'str'
        }],
        ['ETHUSD-PERP', {
            index: 1, exponent: 3, minSize: 0.001, priceTrim: 2, name: 'ETHUSD-PERP', base: 'ETH', quote: 'USDC',
            baseLogo: '/images/tokens/ETH.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'str'
        }],
        ['SOLUSD-PERP', {
            index: 2, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'SOLUSD-PERP', base: 'SOL', quote: 'USDC',
            baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'str'
        }],
        [0, {
            index: 0, exponent: 4, minSize: 0.0001, priceTrim: 1, name: 'BTCUSD-PERP', base: 'BTC', quote: 'USDC',
            baseLogo: '/static/coins/bitcoin.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'num'
        }],
        [1, {
            index: 1, exponent: 3, minSize: 0.001, priceTrim: 2, name: 'ETHUSD-PERP', base: 'ETH', quote: 'USDC',
            baseLogo: '/images/tokens/ETH.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'num'
        }],
        [2, {
            index: 2, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'SOLUSD-PERP', base: 'SOL', quote: 'USDC',
            baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg', mapType: 'num'
        }],
    ])],
]);
