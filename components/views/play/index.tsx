'use client'
import Container from '@/components/common/container'
import { GAMES } from '@/components/games'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Play = () => {
  return (
    <div className="flex justify-center  ">
      <div
        className={cn(
          'grid place-items-center   gap-4 px-4 py-4 grid-cols-1 w-max ',
          'md:grid-cols-2 ',
        )}
      >
        {GAMES.length > 1 &&
          GAMES.map((game) => (
            <Container
              key={game.short_name}
              className="border border-transparent w-full bg-foreground min-w-[322px] duration-500 ease-in-out hover:border-[var(--accent)]  hover:border rounded-lg"
            >
              <Link
                href={`/play/${game.short_name}`}
                className={cn(
                  'w-full  flex flex-col items-center gap-8  transition-colors p-4 rounded-lg cursor-pointer bg-background  ',
                )}
              >
                <header>
                  <Image
                    src={game.image!}
                    alt={game.short_name}
                    width={90}
                    height={90}
                  />
                </header>
                <Button className="w-32">{game.short_name}</Button>
              </Link>
            </Container>
          ))}
      </div>
    </div>
  )
}

export default Play
