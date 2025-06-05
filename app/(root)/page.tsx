/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { cn } from "@/lib/utils";
import GlowingButton from "@/components/ui/glowing-button";
import GlowingButtonReverse from "@/components/ui/glowing-button-reverse";
// import GlowingButton from "@/components/ui/glowing-button";

export const metadata: Metadata = {
  title: "Simterview | AI Mock Interviews for Software Engineers",
  description:
    "Practice technical coding interviews and behavioral questions with AI interviewers. Get FAANG-ready with realistic mock interviews for software engineers at all experience levels.",
  keywords:
    "software engineer interview practice, coding interview simulator, tech interview preparation, FAANG interview prep, software developer mock interviews, programming interview questions, technical interview training, AI interview coach, algorithm practice for interviews, system design interview prep",
};

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "absolute inset-0",
          "z-[-1]",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "[mask-image:radial-gradient(ellipse_120%_50%_at_center,black_40%,transparent_80%)]"
        )}
      />
      
      {/* Hero Section */}
      <section
        className="w-full max-w-6xl py-8 px-2 sm:py-12 lg:py-16 flex flex-col items-center "
        aria-label="Software Engineering Interview Preparation"
      >
        <div className="sm:my-12 my-6 bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6 text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(254,240,138,0.6)_0%,rgba(254,240,138,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
            <span>
              Don't cheat. Let's get good together.
            </span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-yellow-300/0 via-yellow-400/90 to-yellow-300/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>

        <div className="flex flex-col gap-8 w-full items-center text-center max-sm:pt-8">
          <h1 className="font-bold tracking-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl px-4">
            SWE Interview Prep With AI 
            <ContainerTextFlip 
              words={["Interview Coach", "Technical Mentor", "Behavioral Trainer"]} 
              animationDuration={400}
              className="mt-2"
            />
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed px-4">
            Your AI Interview coach prepares you for FAANG-level interviews.
          </p>
          <div className="mt-4 gap-6 sm:gap-8 flex flex-col sm:flex-row">
            <Link href="/demo">
              <GlowingButton text="Try Demo Interview" />
            </Link>

            <Link href="/custom-interview">
              <GlowingButtonReverse text="Custom Interview" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
