# Loud Burst

A kinetic-typography loop on white paper: a five-word sentence types itself in word by word, one word explodes into colourful drawn strokes, and everything leaves the frame before the next sentence begins — in a different palette, on a fixed 30fps cycle a little under two seconds long.

## Why

Most type-in animations either snap words into place or ease them in with a generic curve, and both read as generic. The interesting part here is that the line's own motion is measured rather than modelled: when the second word arrives, the whole line eases toward its final position, overshoots by about 9%, and settles back over twelve ticks. No exponential follower produces that shape — it misses the fast middle and the overshoot both — so it ships as a lookup table instead, sampled tick by tick.

The burst is the same idea taken further. The exploding word isn't swapped for a particle effect; it's captured to an offscreen sprite at its final jittered pose and sliced into real horizontal ribbons that inherit its actual letterforms, while separate hatch groups of tapered strokes launch from its edges along hand-keyframed paths — each group's hue sliding along the spectrum in flight. One seeded PRNG rolled once at init drives every jitter and offset, so the loop replays identically every time rather than reshuffling itself on each pass.

## How it works

- **Blur is a resize chain, not a filter.** Halve the sprite one to three times, then double back up, bilinear each step. A single big downscale/upscale reads as mosaic; the chain reads as a lens finding focus — which matters most on the last word, which arrives genuinely out of focus and takes eight ticks to resolve.
- **The burst word is sliced, not swapped.** Its final jittered state gets rasterised once and cut into seven horizontal ribbons that rain down and out, outer rows accelerating faster than inner ones, while hatch groups of parallel tapered dashes grow roughly tenfold over eight ticks along measured paths.
- **Surviving words zoom about the burst word's centre**, get an outward throw that starts on a slow curve and finishes multiplying tick over tick, and fade while accelerating — gone within a tick of full strength rather than lingering into the next phase.
- **A handful of oversized single strokes hand the ending over** from the small hatches — a hook, a bar, a diagonal — clearing the frame before two blank ticks close the loop.
- **The render loop only redraws when the 30fps tick actually advances**, and under reduced motion it renders one static mid-burst frame rather than the loop's resting position, since a frozen sentence mid-typing says nothing about what the piece is.

## Stack

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS v4
- **Rendering:** a single `<canvas>` and the 2D context — no WebGL, no CSS animation, no animation library
- **Font:** [Archivo](https://fonts.google.com/specimen/Archivo) at 600 — a heavy grotesque, loaded through `next/font`

The animation (`src/components/loud-burst/`) doesn't import React or Next — `engine.ts` is a plain class over a canvas element, `strokes.ts` holds the hand-authored keyframe paths for the burst's hatch groups, `params.ts` holds the tuning constants and the four sentences it cycles through, and `loud-burst-card.tsx` is the thin wrapper that mounts it and watches for visibility, reduced-motion, and route transitions.

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
