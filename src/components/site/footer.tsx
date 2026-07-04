const cols = [
  {
    heading: "Services",
    links: ["Precision Felling", "Timber Harvesting", "Land Clearing", "Stump Grinding", "Storm Response"],
  },
  {
    heading: "Studio",
    links: ["About", "Our Crew", "Safety", "Careers", "Journal"],
  },
  {
    heading: "Contact",
    links: ["1800 IRONBARK", "hello@ironbark.co", "Yarra Valley, VIC", "Mon–Sat · 6am–6pm"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="font-display text-2xl font-semibold tracking-tight">
              IRONBARK
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              Precision tree logging & land clearing, delivered with the craft
              and care of a design studio. Across Victoria since 2004.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.heading}>
              <h4 className="eyebrow">{c.heading}</h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-ink-soft transition-colors hover:text-clay"
                      data-cursor="hover"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* oversized wordmark */}
        <div className="mt-16 overflow-hidden border-t border-ink/15 pt-8">
          <div className="font-display text-[19vw] font-light leading-none tracking-tighter text-ink/[0.07] md:text-[13rem]">
            IRONBARK
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute sm:flex-row">
          <span>© {new Date().getFullYear()} IRONBARK Logging Co.</span>
          <span>Licensed · Insured · Arborist certified</span>
        </div>
      </div>
    </footer>
  );
}
