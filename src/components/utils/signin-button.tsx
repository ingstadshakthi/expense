"use client";

import { signInAction } from "@/lib/action";
import { Button } from "@/components/ui/button";

function SignInButton() {
  return (
    <form action={signInAction} className="w-full">
      <Button
        type="submit"
        variant="outline"
        className="flex h-11 w-full items-center justify-center gap-3 border-border px-6 text-sm font-medium transition-all hover:bg-secondary cursor-pointer"
      >
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={20}
          width={20}
        />
        <span>Continue with Google</span>
      </Button>
    </form>
  );
}

export default SignInButton;
