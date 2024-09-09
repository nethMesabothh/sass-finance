"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export const WelcomeMsg = (props: Props) => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        {isLoaded ? (
          `Welcome back, ${user?.firstName}`
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        )}
      </h2>
      {isLoaded ? (
        <p className="text-sm lg:text-base text-slate-200">
          This is your Financial Overview Report
        </p>
      ) : (
        <div className="space-y-4">
          <Skeleton className="h-4 w-[230px]" />
        </div>
      )}
    </div>
  );
};
