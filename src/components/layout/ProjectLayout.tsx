"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ProjectLayoutProps {
  logo?: string | React.ReactNode;
  title: string;
  duration?: string;
  links?: {
    github?: string;
    website?: string;
  };
  children: React.ReactNode;
}

export default function ProjectLayout({
  logo,
  title,
  duration,
  links,
  children,
}: ProjectLayoutProps) {
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "-30% 0px -70% 0px",
  });
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    setIsFixed(inView);
  }, [inView]);

  return (
    <section className="relative space-y-10">
      {/* 상단 헤더 영역 - 플로팅 스타일 */}
      <div
        className={`sticky z-20 transition-all duration-300
        ${
          isFixed
            ? "top-3 mx-auto max-w-[95%] rounded-full shadow-[0_1px_6px_rgba(55,48,163,0.08)] border border-indigo-200/40 bg-white"
            : "top-6 mx-0 border-transparent"
        }`}
      >
        <div className="flex items-center gap-4 px-5 py-3">
          {typeof logo === "string" ? (
            <div className="w-7 h-7 relative rounded-sm overflow-hidden">
              <Image src={logo} alt={title} fill className="object-cover" />
            </div>
          ) : logo ? (
            logo
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/70" />
          )}

          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <span
              className={`font-semibold ${
                isFixed ? "text-base" : "text-xl"
              } text-foreground truncate max-w-[16rem] transition-all duration-300`}
            >
              {title}
            </span>
            {duration && <span className="text-sm text-muted-foreground">{duration}</span>}

            <div className="flex gap-3 mt-1 md:mt-0 md:ml-2">
              {links?.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary hover:text-main-500 hover:underline transition-colors"
                >
                  GitHub ↗
                </a>
              )}
              {links?.website && (
                <a
                  href={links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary hover:text-main-500 hover:underline transition-colors"
                >
                  Website ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div ref={ref} className="space-y-10">
        {children}
      </div>
    </section>
  );
}
