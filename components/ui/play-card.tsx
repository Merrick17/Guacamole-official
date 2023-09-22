import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import { cn } from '@/lib/utils';

const PlayCard = ({
  title,
  image,
  href,
  disabled,
  className,
}: {
  title: string;
  image: string;
  href: string;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={cn(
        'w-full lg:max-w-[322px]  overflow-hidden h-[216px] group flex flex-col items-center gap-8  relative transition-colors p-4 rounded-lg cursor-pointer bg-background  border border-transparent  duration-500 ease-in-out',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        !disabled && ` hover:border-[var(--accent)]  hover:border`,
        className
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="opacity-50 group-hover:scale-105 transition-all duration-500 ease-in-out"
      />
      <Button className="w-32 absolute bottom-4">{title}</Button>
    </Link>
  );
};

export default PlayCard;
