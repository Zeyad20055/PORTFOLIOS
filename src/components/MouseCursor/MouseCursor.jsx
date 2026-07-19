import { useEffect, useRef, useState } from "react";

// Lightweight custom cursor: a small dot with a trailing ring. Disabled
// automatically on touch devices. Uses event delegation (mouseover/mouseout
// on the window, matched with closest()) instead of querying interactive
// elements once on mount — that way buttons/links that appear later (mobile
// menu, the ScrollTop button, etc.) still trigger the hover-grow effect.
export default function MouseCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

  useEffect(() => {
    if (isTouch) return;

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let frame;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(animateRing);
    };

    const handleOver = (e) => {
      if (e.target.closest?.("a, button, [data-cursor-hover]")) {
        ringRef.current?.classList.add("scale-150", "border-[var(--color-secondary)]");
      }
    };
    const handleOut = (e) => {
      if (e.target.closest?.("a, button, [data-cursor-hover]")) {
        ringRef.current?.classList.remove("scale-150", "border-[var(--color-secondary)]");
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    frame = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(frame);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-2 w-2 rounded-full bg-[var(--color-secondary)] md:block" />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-white/30 transition-[transform,border-color] duration-150 md:block"
      />
    </>
  );
}
