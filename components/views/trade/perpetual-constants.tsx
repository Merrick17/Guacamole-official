export interface Product {
    index: number,
    exponent: number,
    priceTrim: number,
    minSize: number,
    name: string,
    base: string,
    quote: string,
    baseLogo: string,
    quoteLogo: string
}

export const ProductMap = new Map<string | number, Product>([
    ['BTCUSD-PERP', {
        index: 0, exponent: 4, minSize: 0.0001, priceTrim: 1, name: 'BTCUSD-PERP', base: 'BTC', quote: 'USDC',
        baseLogo: '/static/coins/bitcoin.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg'
    }],
    ['ETHUSD-PERP', {
        index: 1, exponent: 3, minSize: 0.001, priceTrim: 2, name: 'ETHUSD-PERP', base: 'ETH', quote: 'USDC',
        baseLogo: '/images/tokens/ETH.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg'
    }],
    ['SOLUSD-PERP', {
        index: 2, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'SOLUSD-PERP', base: 'SOL', quote: 'USDC',
        baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg'
    }],
    ['OPOS0D', {
        index: 4, exponent: 0, minSize: 1, priceTrim: 2, name: 'OPOS0D-ZDF', base: 'OPOS', quote: 'USDC',
        baseLogo: '/static/coins/opos-logo.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg'
    }],
    [0, {
        index: 0, exponent: 4, minSize: 0.0001, priceTrim: 1, name: 'BTCUSD-PERP', base: 'BTC', quote: 'USDC',
        baseLogo: '/static/coins/bitcoin.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg'
    }],
    [1, {
        index: 1, exponent: 3, minSize: 0.001, priceTrim: 2, name: 'ETHUSD-PERP', base: 'ETH', quote: 'USDC',
        baseLogo: '/images/tokens/ETH.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg'
    }],
    [2, {
        index: 2, exponent: 1, minSize: 0.1, priceTrim: 4, name: 'SOLUSD-PERP', base: 'SOL', quote: 'USDC',
        baseLogo: '/images/tokens/SOL.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg'
    }],
    [4, {
        index: 4, exponent: 0, minSize: 1, priceTrim: 2, name: 'OPOS0D-ZDF', base: 'OPOS', quote: 'USDC',
        baseLogo: '/static/coins/opos-logo.png', quoteLogo: '/icons/earn/usd-coin-usdc-logo.svg'
    }],
]);


