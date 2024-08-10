import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="my-2">
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="animate-spin w-10 h-10" />
      </ClerkLoading>
    </div>
  );
}
