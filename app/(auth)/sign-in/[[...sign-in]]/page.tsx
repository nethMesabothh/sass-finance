import { SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="my-2">
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="animate-spin w-10 h-10" />
      </ClerkLoading>
    </div>
  );
}
