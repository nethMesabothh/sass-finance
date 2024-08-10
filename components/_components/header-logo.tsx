import React from "react";
import { Building2 } from "lucide-react";
import Link from "next/link";

type Props = {};

export const HeaderLogo = (props: Props) => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Building2 className="text-white" height={28} width={28} />
        <p className="font-semibold text-white text-3xl ml-2.5 py-2 flex justify-center items-center">
          <span className="mt-[0.20rem]">Finance</span>
        </p>
      </div>
    </Link>
  );
};
