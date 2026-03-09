"use client";

import React from "react";
import {
  IconCollaboration,
  IconAutomation,
  IconAnalytics,
  IconIntegrations,
  IconSecurity,
  IconSupport,
  IconGlobal,
} from "./icons";

type Feature = {
  Icon: (props: { className?: string }) => React.ReactElement;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    Icon: IconCollaboration,
    title: "Real-time Collaboration",
    body: "Work together seamlessly with your team. Share updates, communicate instantly, and stay aligned on every project.",
  },
  {
    Icon: IconAutomation,
    title: "Smart Automation",
    body: "Automate repetitive tasks and workflows. Save hours every week and focus on what matters most to your business.",
  },
  {
    Icon: IconAnalytics,
    title: "Advanced Analytics",
    body: "Get actionable insights with powerful reporting tools. Make data-driven decisions with confidence.",
  },
  {
    Icon: IconIntegrations,
    title: "Seamless Integrations",
    body: "Connect with your favorite tools. Works perfectly with your existing workflow and tech stack.",
  },
  {
    Icon: IconSecurity,
    title: "Enterprise Security",
    body: "Bank-level encryption and security protocols. Your data is protected with industry-leading standards.",
  },
  {
    Icon: IconSupport,
    title: "24/7 Support",
    body: "Get help whenever you need it. Our expert support team is always ready to assist you.",
  },
  {
    Icon: IconGlobal,
    title: "Global Infrastructure",
    body: "Deploy instantly to 35+ regions worldwide. Ensure low latency for all your users, everywhere.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative overflow-hidden bg-[#FFFBFE] py-20 md:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#E8DEF8]/40 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full bg-[#7D5260]/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center mb-14">
          <h2
            id="features-heading"
            className="text-4xl md:text-5xl font-medium text-[#1C1B1F] tracking-tight mb-4"
          >
            Capabilities
          </h2>
          <p className="text-lg text-[#49454F] max-w-xl mx-auto leading-relaxed">
            Everything you need to build faster and better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ Icon, title, body }) => (
            <article
              key={title}
              className="group flex flex-col gap-4 p-7 rounded-[24px] bg-[#F3EDF7] shadow-sm transition-all duration-300 hover:shadow-md hover:bg-[#EDE8F5] hover:scale-[1.02] cursor-default"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-[14px] bg-[#E8DEF8] transition-colors duration-300 group-hover:bg-[#6750A4]/15">
                <Icon className="w-5 h-5 text-[#6750A4]" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-[#1C1B1F] transition-colors duration-300 group-hover:text-[#6750A4]">
                  {title}
                </h3>
                <p className="text-sm text-[#49454F] leading-relaxed">
                  {body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}