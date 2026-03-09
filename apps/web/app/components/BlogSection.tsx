const posts = [
  {
    date:   "2025-01-15",
    author: "Sarah Chen",
    title:  "Boosting Team Productivity with AI Automation",
    excerpt:
      "Discover how Acme's intelligent automation features can revolutionize your team's workflow and free up valuable time for innovation.",
    image:  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt:    "Abstract street perspective with long shadows",
  },
  {
    date:   "2025-01-10",
    author: "Marcus Rodriguez",
    title:  "The Future of Collaboration: Real-time & Seamless",
    excerpt:
      "Explore the power of real-time collaboration tools and how they are shaping the way modern teams connect, share, and achieve goals.",
    image:  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    alt:    "City lights at night reflecting off wet roads",
  },
  {
    date:   "2025-01-05",
    author: "Elena Popov",
    title:  "Scaling Your SaaS with Global Infrastructure",
    excerpt:
      "Learn the secrets to deploying your application globally, ensuring lightning-fast performance and unparalleled reliability for users everywhere.",
    image:  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    alt:    "Japanese street scene with traditional and modern buildings",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "2-digit",
    day:   "2-digit",
  }).replace(/\//g, "-");
}

export default function BlogSection() {
  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="bg-[#FFFBFE] py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-6">

        {/* ── Section header row ── */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <h2
            id="blog-heading"
            className="
              text-3xl md:text-4xl font-medium
              text-[#1C1B1F] tracking-tight
              leading-tight max-w-sm
            "
          >
            Latest Insights from the Acme Blog
          </h2>
          <a
            href="#blog-all"
            className="
              shrink-0
              text-sm font-medium text-[#6750A4]
              px-4 py-2 rounded-[9999px]
              transition-all duration-200
              hover:bg-[#6750A4]/10
              active:scale-95
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#6750A4] focus-visible:ring-offset-2
            "
          >
            View All
          </a>
        </div>

        {/* ── Blog card grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <article
              key={post.title}
              className="
                group
                flex flex-col
                rounded-[24px]
                bg-[#F3EDF7]
                shadow-sm overflow-hidden
                transition-all duration-300
                hover:shadow-md hover:scale-[1.02]
              "
            >
              {/* ── Image ── */}
              <div className="relative h-52 overflow-hidden">
                {/* Zoom on group-hover */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.alt}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                  loading="lazy"
                />
                {/* Subtle overlay for text contrast */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-[#1C1B1F]/20 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  "
                  aria-hidden="true"
                />
              </div>

              {/* ── Meta + content ── */}
              <div className="flex flex-col gap-3 p-6 flex-1">
                {/* Meta row */}
                <div className="flex items-center gap-2 text-xs font-medium text-[#49454F] tracking-wider uppercase">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#6750A4] inline-block" />
                  <span>{post.author}</span>
                </div>

                {/* Title */}
                <h3
                  className="
                    text-base font-medium text-[#1C1B1F] leading-snug
                    transition-colors duration-200
                    group-hover:text-[#6750A4]
                  "
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#49454F] leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                {/* Inline read-more link */}
                <a
                  href="#"
                  className="
                    self-start mt-1
                    text-sm font-medium text-[#6750A4]
                    px-3 py-1 -mx-3
                    rounded-[9999px]
                    transition-all duration-200
                    hover:bg-[#6750A4]/10
                    active:scale-95
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-[#6750A4]
                  "
                >
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}