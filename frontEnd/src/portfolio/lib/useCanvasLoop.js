import { useEffect } from "react";

const NOMINAL = 1000 / 60; // ~16.67ms — fallback dt for the first/just-resumed frame

/**
 * Shared canvas animation loop. Every portfolio canvas repeats the same plumbing:
 * a HiDPI-scaled buffer, a single requestAnimationFrame loop with an optional fps
 * cap, auto-pause when the tab is hidden (and, optionally, when the canvas scrolls
 * off-screen), one static frame under prefers-reduced-motion, and full teardown of
 * listeners/observers. This hook owns all of that; the caller owns the drawing.
 *
 * The caller passes a *scene factory* — a function called once per effect run with
 * `{ canvas, ctx, dpr, reduced }`. Its closure holds the scene's own state (particle
 * arrays, etc.) exactly as the inline effects did before. It returns:
 *   - `resize(w, h)` — re-seed / recompute layout after the buffer is (re)sized
 *   - `frame(w, h, dt)` — draw one frame (`dt` = ms since the previous drawn frame)
 *   - `cleanup()` — optional; remove any extra listeners the scene added (e.g. pointer)
 *
 * Behaviour differences the hook intentionally normalises (all strict improvements):
 *   - off-screen / hidden resumes never produce a giant `dt` jump (dt resets to NOMINAL)
 *   - a resize while reduced-motion repaints the static frame
 *
 * @param {object} opts
 * @param {import("react").RefObject<HTMLCanvasElement>} opts.canvasRef
 * @param {import("react").RefObject<HTMLElement>} [opts.sizeRef] element to measure when sizeFrom==="element" (defaults to the canvas's parent)
 * @param {"window"|"canvas"|"element"} [opts.sizeFrom="canvas"] where width/height come from
 * @param {number} [opts.fps=0] frame cap; 0 = uncapped (draw on every rAF)
 * @param {boolean} [opts.observeVisibility=true] pause the loop while the canvas is off-screen
 * @param {boolean} [opts.styleSize=false] also set canvas.style.width/height (element-sized canvases)
 * @param {Array} [opts.deps=[]] effect deps — the scene is rebuilt when any change
 * @param {(api: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number, reduced: boolean }) => { resize?: (w: number, h: number) => void, frame: (w: number, h: number, dt: number) => void, cleanup?: () => void }} opts.scene
 */
export default function useCanvasLoop({
  canvasRef,
  sizeRef,
  sizeFrom = "canvas",
  fps = 0,
  observeVisibility = true,
  styleSize = false,
  deps = [],
  scene,
}) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const measureEl =
      sizeFrom === "element" ? sizeRef?.current ?? canvas.parentElement : null;

    const s = scene({ canvas, ctx, dpr, reduced });
    const minDelta = fps > 0 ? 1000 / fps : 0;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let visible = !observeVisibility; // when not observed, treat as always on-screen

    const measure = () => {
      if (sizeFrom === "window") return [window.innerWidth, window.innerHeight];
      if (sizeFrom === "element" && measureEl)
        return [measureEl.clientWidth, measureEl.clientHeight];
      return [canvas.offsetWidth, canvas.offsetHeight];
    };

    const resize = () => {
      [w, h] = measure();
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      if (styleSize) {
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.resize?.(w, h);
      if (reduced) s.frame(w, h, NOMINAL); // keep the static frame correct after a resize
    };

    const loop = (now) => {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
      const dt = last ? now - last : NOMINAL;
      if (minDelta && dt < minDelta) return; // fps-gate: skip this rAF, keep last untouched
      last = now;
      s.frame(w, h, dt);
    };

    const startLoop = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = 0; // resume cleanly — no dt spike after a pause
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    // sizing triggers: a ResizeObserver tracks the box for canvas/element sizing;
    // window-sized canvases (fixed, full-viewport) only need the resize event.
    let ro = null;
    if (sizeFrom === "window") {
      window.addEventListener("resize", resize);
    } else {
      ro = new ResizeObserver(() => resize());
      ro.observe(measureEl ?? canvas);
    }
    document.addEventListener("visibilitychange", onVisibility);

    let io = null;
    if (observeVisibility) {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) startLoop();
          else stopLoop();
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }

    resize();
    s.frame(w, h, NOMINAL); // initial paint (and the only frame under reduced-motion)
    if (!reduced) startLoop();

    return () => {
      stopLoop();
      if (sizeFrom === "window") window.removeEventListener("resize", resize);
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      s.cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
