/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { cn } from "@/lib/utils";

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
        className="w-full max-w-5xl px-6 py-8 sm:py-20 lg:py-32"
        aria-label="Software Engineering Interview Preparation"
      >
        <div className="flex flex-col gap-10 w-full items-center text-center">
          <h1 className="font-bold tracking-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight max-w-4xl px-4">
            Simulate Life-Like SWE Interviews With Your AI 
            <ContainerTextFlip 
              words={["Interview Coach", "LeetCode Mentor", "Behavioral Trainer", "Recruiter"]} 
              animationDuration={400}
              className="mt-2"
            />
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed px-4">
            Your AI Interview coach prepares you for FAANG-level interviews.
          </p>
          <div className="mt-4">
            <Button
              asChild
              className="bg-white text-black  py-4 px-8 text-md font-bold rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href="/demo">Try Demo Interview</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
