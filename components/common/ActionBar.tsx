import { PropsWithChildren } from 'react'

export function ActionBar({ children }: PropsWithChildren) {
  return (
    <>
      <div className=" max-w-[512px]  w-full z-10  bg-foreground rounded-lg ">
        <div className="  w-full p-5 flex flex-wrap items-center gap-1 justify-evenly  rounded-lg backdrop:blur-[50px]">
          {children}
        </div>
      </div>
    </>
  )
}
