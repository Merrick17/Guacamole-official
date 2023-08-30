import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import { cn } from '@/lib/utils';

const PlayCard = ({
  title,
  image,
  href,
  disabled,
}: {
  title: string;
  image: string;
  href: string;
  disabled?: boolean;
}) => {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={cn(
        'w-full lg:max-w-[322px] flex flex-col items-center gap-8  transition-colors p-4 rounded-lg cursor-pointer bg-background  border border-transparent  duration-500 ease-in-out',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        !disabled && ` hover:border-[var(--accent)]  hover:border`
      )}
    >
      <header>
        <Image src={image} alt={title} width={90} height={90} />
      </header>
      <Button className="w-32">{title}</Button>
    </Link>
  );
};

export default PlayCard;
