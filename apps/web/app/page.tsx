import Header           from "./components/Header";
import HeroSection      from "./components/HeroSection";
import StatsBar         from "./components/StatsBar";
import FeaturesSection  from "./components/FeaturesSection";
import BlogSection      from "./components/BlogSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <BlogSection />
      </main>

      <footer
        className="
          border-t border-[#79747E]/15
          bg-[#F3EDF7]
          py-10
        "
      >
        <div
          className="
            container mx-auto max-w-6xl px-6
            flex flex-col md:flex-row items-center
            justify-between gap-4
          "
        >
          <span className="text-sm font-medium text-[#49454F]">
            Mkdona
          </span>
          <p className="text-xs text-[#79747E]">
            © {new Date().getFullYear()} Acme Inc. All rights reserved.
          </p>
          <nav className="flex gap-4" aria-label="Footer">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="
                  text-xs text-[#49454F]
                  rounded-[9999px] px-2 py-1
                  hover:text-[#6750A4] hover:bg-[#6750A4]/10
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#6750A4]
                "
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}