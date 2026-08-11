"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import zulassung from "@/public/images/refs/deutschezulassung.jpg";
import heizwechsel from "@/public/images/refs/heizwechsel.jpg";
import hairvenly from "@/public/images/refs/hairvenly.jpg";

type Tile = {
  img: StaticImageData;
  className: string;
  drift: number;
  duration: number;
  delay: number;
};

const TILES: Tile[] = [
  {
    img: zulassung,
    className: "left-[-4rem] top-[7rem] w-[19rem] rotate-[-3deg] blur-[3px] opacity-30",
    drift: -22,
    duration: 26,
    delay: 0,
  },
  {
    img: heizwechsel,
    className: "right-[-4.5rem] top-[5.5rem] w-[21rem] rotate-[2.5deg] blur-[2px] opacity-35",
    drift: -28,
    duration: 22,
    delay: 3,
  },
  {
    img: hairvenly,
    className: "left-[1.5rem] top-[26rem] w-[15rem] rotate-[2deg] blur-[4px] opacity-25",
    drift: -16,
    duration: 30,
    delay: 6,
  },
  {
    img: zulassung,
    className: "right-[2rem] top-[27rem] w-[13rem] rotate-[-2deg] blur-[4px] opacity-20",
    drift: -14,
    duration: 34,
    delay: 9,
  },
];

/* Schwebende, abgedunkelte Referenz-Screenshots im Hero-Hintergrund –
   echte Arbeit statt Deko, als leichte Animation statt Video. */
export default function HeroBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div
      className="absolute inset-0 hidden md:block [mask-image:linear-gradient(to_bottom,black_55%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_85%)]"
      aria-hidden
    >
      {TILES.map((t, i) => (
        <motion.div
          key={i}
          className={`absolute overflow-hidden rounded-xl border border-white/5 ${t.className}`}
          animate={reduce ? {} : { y: [0, t.drift, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  duration: t.duration,
                  delay: t.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <Image src={t.img} alt="" className="w-full" sizes="340px" />
          <div className="absolute inset-0 bg-night/55" />
        </motion.div>
      ))}
    </div>
  );
}
