import { Button } from '@/components/ui/button'
// import { getTokenBalance } from 'gamba'
import { useBonusToken, useGamba } from 'gamba/react'
import { formatLamports } from 'gamba/react-ui'
import dynamic from 'next/dynamic'

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
)

export default function UserModal() {
  const gamba = useGamba()
  const bonus = useBonusToken()
  return (
    <>
      <h1>
        {formatLamports(gamba.balances.total)}
      </h1>
      <h3>
        {gamba.wallet.publicKey.toBase58()}
      </h3>
      <div className="grid gap-3">
        {!gamba.user.created && (
          <Button onClick={gamba.initializeAccount}>
            Create
          </Button>
        )}
        {gamba.user.created && (
          <Button onClick={gamba.closeAccount}>
            Close account
          </Button>
        )}
        {bonus.balance > 0 && (
          <Button onClick={() => gamba.methods.redeemBonusToken(bonus.mint, bonus.associatedTokenAddress, bonus.balance)}>
            Redeem Bonus {formatLamports(bonus.balance)}
          </Button>
        )}
      </div>
      <WalletMultiButtonDynamic />
    </>
  )
}