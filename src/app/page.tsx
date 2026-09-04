import { LoudBurstCard } from "@/components/loud-burst/loud-burst-card";

const BUILT_FROM = [
  "The line's glide is measured, not modelled. When the second word arrives, the whole line eases toward its final position, overshoots by about 9%, and settles back over twelve ticks — encoded as a lookup table, because an exponential follower misses both the fast middle and the overshoot.",
  "Blur is a progressive downscale/upscale chain, not a filter — halve the sprite once to three times, then double back up, bilinear each step. One big resize reads as mosaic; the chain reads as a lens finding focus.",
  "The burst word is captured to an offscreen sprite and sliced into horizontal ribbons that rain down and out, rows accelerating outward, while hatch groups of tapered strokes launch from its edges along measured keyframe paths, each group's hue sliding along the spectrum in flight.",
  "One seeded PRNG, rolled once at init, drives every jitter, drift, and dash offset — so the loop replays identically every time rather than reshuffling itself on each pass.",
];

const CONSTRAINTS = [
  "The last word of each sentence arrives genuinely out of focus and takes eight ticks to resolve — a real depth-of-field pull, not a quick fade, because it's the punchline.",
  "Surviving words zoom about the burst word's centre and get an extra outward throw that starts on a slow curve and finishes multiplying tick over tick, so they're gone within a tick of full speed rather than lingering.",
  "A handful of oversized single strokes hand the ending over from the small hatches — a green hook, a blue bar, a warm diagonal — all clear by the second-to-last tick, with two blank ticks closing the loop.",
  "Canvas 2D, framework-free, and the render loop only redraws when the 30fps tick actually advances — a still mid-burst frame stands in for the whole animation under reduced motion.",
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
        <span className="text-sm font-bold tracking-tight">Loud Burst</span>
        <a
          href="https://github.com/prashantkoirala465/loud-burst"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            A sentence that types itself, then explodes.
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            Five words type themselves onto white paper, one at a time,
            oversized and blurred, snapping into focus as they land. Then one
            word — the punchline — heats up, trembles, and dissolves into
            colourful drawn strokes while the rest of the sentence rushes off
            the sides. A different sentence begins the loop in a different
            palette.
          </p>
        </div>

        <LoudBurstCard />
      </main>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              How it&apos;s built
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {BUILT_FROM.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              Constraints
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {CONSTRAINTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span>© {year} Prashant Koirala</span>
          <a
            href="https://github.com/prashantkoirala465/loud-burst"
            className="transition-colors hover:text-foreground"
          >
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
