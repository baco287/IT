"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Tippt Text zeichenweise, sobald er im Viewport ist (neon.com-Terminal-Effekt). */
export default function Typewriter({
  text,
  speed = 32,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setShown(text);
      return;
    }
    if (!inView) {
      setShown("");
      return;
    }
    let i = 0;
    setShown("");
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed, reduce]);

  return (
    <span ref={ref} className={className}>
      {shown}
      {shown.length < text.length && !reduce && <span className="caret" />}
    </span>
  );
}
