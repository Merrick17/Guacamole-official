import { ExplorerButton } from '@/components/ui/ExplorerButton';
import Loading from '../views/trade/src/components/Loading';

export const RenderUpdate = ({
  updateText,
  signatures,
  load,
}: {
  updateText: string;
  signatures?: string[];
  load?: boolean;
}) => {
  console.log('signatures', signatures);
  if (signatures) {
    return (
      <div className="flex flex-col">
        <span> Transaction confirmed 👌</span>
        {signatures.map((sig) => {
          return <ExplorerButton key={sig} tx={sig} />;
        })}
      </div>
    );
  }
  return (
    <div className="flex flex-row items-center">
      <span className="mr-2">{updateText} </span> {load && <Loading />}
    </div>
  );
};
