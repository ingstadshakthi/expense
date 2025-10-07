import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { ArrowRight } from "lucide-react"; // ✅ ShadCN/Lucide icon

export default async function Home() {
  const session = await auth();
  const ctaLink = session ? "/dashboard" : "/login";

  return (
    <div className="fixed top-[53px] left-0 flex min-h-[calc(100vh-53px)] w-full flex-col items-center justify-evenly gap-12 bg-gradient-to-b from-white via-blue-100 to-white px-4 py-24 text-center transition-colors duration-300 sm:gap-10 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Top tagline */}
      <h2 className="mb-6 rounded-full bg-gray-200/70 px-4 py-2 text-sm text-gray-700 italic sm:text-base dark:bg-gray-700/40 dark:text-gray-200">
        Not able to track where your money disappears?
      </h2>

      {/* Headline + paragraph */}
      <div className="flex max-w-2xl flex-col gap-3">
        <h3 className="text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl dark:text-gray-100">
          Take control of your finances - one expense at a time.
        </h3>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Our smart expense tracker helps you visualize where your money goes, manage spending
          habits, and make informed financial decisions, all in a clean intuitive dashboard designed
          for clarity and control.
        </p>
      </div>

      {/* CTA buttons */}
      <div className="mb-12 flex items-center gap-6">
        <Link href={ctaLink}>
          <Button size="lg" className="font-semibold">
            Get Started
          </Button>
        </Link>

        <Link
          href="/login"
          className="text-primary hover:text-primary/80 flex items-center gap-2 text-base font-medium transition-colors hover:underline"
        >
          Login
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
