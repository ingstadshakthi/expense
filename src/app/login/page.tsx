import SignInButton from "@/components/utils/signin-button";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="border border-border bg-card p-8">
          {/* Logo mark */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center bg-primary text-xl font-black text-primary-foreground">
              E
            </div>
          </div>

          <h1 className="mb-1 text-center text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Sign in to access your expense dashboard
          </p>

          <SignInButton />

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Your data is private and never shared.
          </p>
        </div>
      </div>
    </div>
  );
}
