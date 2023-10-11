'use client';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter } from 'next/navigation';
import { Links } from '@/config/links';
const NavigationList = ({ filter }: { filter?: 'Earn' | 'Trade' }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Select
      defaultValue={pathname}
      onValueChange={(value) => router.push(value)}
    >
      <SelectTrigger className="text-black bg-primary w-max h-7 rounded-lg text-sm ">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {Links.filter((link) => link.name === filter)[0]
            .dropdownItems.filter((item) => !item.disabled)
            .map((link) => (
              <div key={link.name}>
                <SelectItem value={link.href} className="hover:text-black">
                  {link.name}
                </SelectItem>
              </div>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default NavigationList;
