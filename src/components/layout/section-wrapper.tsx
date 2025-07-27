import React from "react";

export default function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-wrapper max-w-[1400px] lg:px-8 md:px-6 px-4 mx-auto ">
      {children}
    </section>
  );
}