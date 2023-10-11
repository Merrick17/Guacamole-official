"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTransitionContext } from "@/context/transition-context";
import { gsap } from "gsap";

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { runPreloader, openPreloader } = useTransitionContext();
  // useEffect(() => {
  // }, [runPreloader]);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline();
      tl.fromTo(
        ".img",
        {
          opacity: 0.1,
        },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.25,
        }
      );
      tl.to(".img", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.25,
        onComplete: () => {
          runPreloader();
        },
      });
    }, containerRef); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, [openPreloader]);
  return (
    <div
      className={cn(
        ` text-white pointer-events-none flex flex-col md:flex-row items-center  justify-center  gap-4   fixed inset-0 bg-black w-screen h-screen z-[99999] will-change-transform transition-all duration-500 ease-in-out ${
          openPreloader ? "opacity-100 " : "opacity-0"
        }`
      )}
      ref={containerRef}
    >
      <Image
        src="/images/themes/green.png"
        width={50}
        height={50}
        className="img opacity-10"
        alt="green"
      />
      <Image
        src="/images/themes/violet.png"
        width={50}
        height={50}
        className="img opacity-10"
        alt="violet"
      />
      <Image
        src="/images/themes/orange.png"
        width={50}
        height={50}
        className="img opacity-10"
        alt="orange"
      />
      <Image
        src="/images/themes/yellow.png"
        width={50}
        height={50}
        className="img opacity-10"
        alt="yellow"
      />
      <Image
        src="/images/themes/white.png"
        width={50}
        height={50}
        className="img opacity-10"
        alt="white"
      />
      <Image
        src="/images/themes/red.png"
        width={50}
        height={50}
        alt="red"
        className="img opacity-10"
      />
    </div>
  );
};

export default Preloader;
