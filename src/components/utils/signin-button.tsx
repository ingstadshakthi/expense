"use client";

import { signInAction } from "@/lib/action";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function SignInButton() {
  return (
    <form action={signInAction}>
      <Button
        type="submit"
        variant="outline"
        className="flex items-center gap-4 px-6 py-4 text-base font-medium cursor-pointer"
      >
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={24}
          width={24}
        />
        <span>Continue with Google</span>
      </Button>
    </form>
  );
}

export default SignInButton;
