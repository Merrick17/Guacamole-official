export const Congested = ({ congested }: { congested: boolean }) => {
  if (!congested) {
    return null;
  }

  return (
    <div className="mb-2 animate-gradient-x bg-gradient-to-r from-green-400 to-blue-500 text-center font-bold text-white">
      Solana is congested, your transaction might fail to send or confirm
    </div>
  );
};
