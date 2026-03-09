const stats = [
  { value: "500k+",   label: "Active Users"     },
  { value: "99.99%",  label: "Uptime SLA"       },
  { value: "24/7",    label: "Support Access"   },
  { value: "\$10M+",   label: "Customer Savings" },
];

export default function StatsBar() {
  return (
    <section
      aria-label="Platform statistics"
      className="container mx-auto max-w-6xl px-6 py-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              group
              flex flex-col items-center justify-center gap-1
              py-7 px-4
              rounded-[24px]
              bg-[#F3EDF7]
              shadow-sm
              transition-all duration-300
              hover:shadow-md hover:bg-[#E8DEF8]
              hover:scale-[1.02]
              cursor-default
            "
          >
            <span
              className="
                text-3xl md:text-4xl font-medium
                text-[#6750A4]
                transition-colors duration-300
                group-hover:text-[#1D192B]
              "
            >
              {stat.value}
            </span>
            <span className="text-sm text-[#49454F] font-medium tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}