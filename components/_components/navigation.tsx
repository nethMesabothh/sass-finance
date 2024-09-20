"use client";

import React, { useState } from "react";
import { NavButton } from "@/components/_components/nav-button";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMedia } from "react-use";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type Props = {};

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Account",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  // {
  //   href: "/settings",
  //   label: "Settings",
  // },
];

export const Navigation = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href), setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <SheetTitle />
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => {
              return (
                <Button
                  variant={pathname === route.href ? "secondary" : "ghost"}
                  onClick={() => onClick(route.href)}
                  className="w-full justify-start"
                  key={route.label}
                >
                  {route.label}
                </Button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => {
        return (
          <NavButton
            key={route.label}
            href={route.href}
            label={route.label}
            isActive={pathname === route.href}
          />
        );
      })}
    </nav>
  );
};
