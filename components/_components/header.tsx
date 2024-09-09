import React from "react";
import { HeaderLogo } from "@/components/_components/header-logo";
import { Navigation } from "@/components/_components/navigation";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { BoxSelect } from "lucide-react";
import { WelcomeMsg } from "@/components/_components/welcome-msg";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="bg-gradient-to-b from-slate-700 to-slate-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <ClerkLoaded>
              <Navigation />
            </ClerkLoaded>
            <ClerkLoading>
              <BoxSelect className="lg:size-8 size-9 animate-spin text-slate-400" />
            </ClerkLoading>
          </div>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="lg:size-8 size-9 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};
