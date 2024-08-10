import React from "react";
import { Landmark } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 w-full justify-items-center content-center">
      {/* IF ON MOBILE OR SMALLER DEVICE */}
      <div className="flex flex-col justify-center items-center space-y-4 p-8 lg:p-16 w-full h-full min-h-screen">
        <h1 className="font-bold text-3xl text-[#2e2a47] ">Welcome Back!</h1>
        <p className="text-base text-[#7e8ca0] my-2">
          Log in or Create account to get back to your dashboard
        </p>
        {props.children}
      </div>
      {/* IF ON LAPTOP OR LARGER DEVICE */}
      <div className="hidden lg:flex items-center justify-center h-full bg-blue-600 w-full">
        <Landmark className="text-white" height={220} width={220} />
      </div>
    </div>
  );
};

export default AuthLayout;
