export default function HeroSection() {
  return (
    <section className="container mx-auto max-w-6xl px-6 pt-8 pb-6">
      {/*
        ── Outer container: large organic radius, surface-container bg ──
        The hero lives inside this shaped card, not as a full-bleed.
      */}
      <div
        className="
          relative overflow-hidden
          rounded-[48px] md:rounded-[48px] rounded-[32px]
          bg-[#F3EDF7]
          px-8 py-14 md:px-16 md:py-20
          min-h-[520px] md:min-h-[480px]
          flex items-center
        "
      >
        {/* ── Atmospheric blur shapes (aria-hidden decorative) ── */}
        <div aria-hidden="true" className="pointer-events-none select-none">
          {/* Large primary circle — top right */}
          <div
            className="
              absolute -top-20 -right-20
              w-[420px] h-[420px] rounded-full
              bg-[#6750A4]/20
              blur-3xl
            "
          />
          {/* Tertiary blob — bottom right */}
          <div
            className="
              absolute bottom-0 right-[5%]
              w-[300px] h-[300px] rounded-full
              bg-[#7D5260]/25
              blur-3xl
            "
          />
          {/* Secondary wash — mid left */}
          <div
            className="
              absolute top-1/2 -translate-y-1/2 -left-10
              w-[220px] h-[220px] rounded-full
              bg-[#E8DEF8]/60
              blur-2xl
            "
          />
        </div>

        {/* ── Layout grid: text left, visual right ── */}
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col gap-6">

            {/* Social proof pill */}
            <div className="flex">
              <span
                className="
                  inline-flex items-center gap-2
                  px-4 py-1.5
                  rounded-[9999px]
                  bg-[#E8DEF8]
                  text-[#1D192B] text-sm font-medium
                  border border-[#6750A4]/15
                "
              >
                {/* Dot indicator */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#6750A4] inline-block" />
                Join 50,000+ teams already using Acme
              </span>
            </div>

            {/* Headline */}
            <h1
              className="
                text-[2.6rem] md:text-[3.5rem]
                font-medium leading-[1.15] tracking-tight
                text-[#1C1B1F]
              "
            >
              Transform the way
              <br />
              your team works
            </h1>

            {/* Body */}
            <p className="text-lg md:text-xl text-[#49454F] leading-relaxed max-w-md">
              Acme Platform brings your team together with powerful tools designed
              to streamline workflows, boost productivity, and drive results.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 pt-2">
              {/* Primary filled */}
              <a
                href="#get-started"
                className="
                  h-12 px-8 inline-flex items-center justify-center
                  rounded-[9999px]
                  bg-[#6750A4] text-white font-medium text-sm tracking-wide
                  shadow-sm
                  transition-all duration-300
                  hover:bg-[#6750A4]/90 hover:shadow-md
                  active:scale-95 active:bg-[#6750A4]/80
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#6750A4] focus-visible:ring-offset-2
                "
              >
                Start free trial
              </a>

              {/* Outlined ghost */}
              <a
                href="#demo"
                className="
                  h-12 px-8 inline-flex items-center gap-2 justify-center
                  rounded-[9999px]
                  border border-[#79747E]
                  text-[#6750A4] font-medium text-sm tracking-wide
                  transition-all duration-300
                  hover:bg-[#6750A4]/5 hover:border-[#6750A4]
                  active:scale-95
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#6750A4] focus-visible:ring-offset-2
                "
              >
                {/* Play icon */}
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="currentColor" aria-hidden="true"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                Watch demo
              </a>
            </div>
          </div>

          {/* ── Right: Decorative organic shape cluster ── */}
          <div
            aria-hidden="true"
            className="hidden md:flex items-center justify-center relative h-[340px]"
          >
            {/*
              Three overlapping organic shapes — mimic the abstract illustration
              in the screenshot using pure CSS circles + mix-blend-multiply.
            */}
            {/* Large lavender circle */}
            <div
              className="
                absolute top-0 right-8
                w-[240px] h-[240px] rounded-full
                bg-[#C4B5F4]/70
                mix-blend-multiply
              "
            />
            {/* Deep primary pill — centre */}
            <div
              className="
                absolute top-10 left-12
                w-[200px] h-[220px]
                rounded-[100px] rounded-tr-[30px]
                bg-[#6750A4]/85
                mix-blend-multiply
                rotate-[-8deg]
              "
            />
            {/* Tertiary mauve circle — bottom */}
            <div
              className="
                absolute bottom-0 left-[15%]
                w-[190px] h-[190px] rounded-full
                bg-[#7D5260]/70
                mix-blend-multiply
              "
            />
            {/* Inner dark core */}
            <div
              className="
                absolute top-[15%] left-[20%]
                w-[130px] h-[160px]
                rounded-[60px] rounded-tr-[10px]
                bg-[#1D192B]/60
                mix-blend-multiply
                rotate-[-5deg]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}