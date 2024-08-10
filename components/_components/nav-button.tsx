import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  isActive: boolean;
};

export const NavButton = (props: Props) => {
  return (
    <Button
      variant="outline"
      asChild
      size="sm"
      className={cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
        props.isActive ? "bg-white/10" : "bg-transparent"
      )}
    >
      <Link href={props.href}>{props.label}</Link>
    </Button>
  );
};
