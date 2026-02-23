import SignInButton from "@/components/utils/signin-button";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center gap-10 px-4 xl:px-0">
      <h2 className="text-3xl font-semibold">
        Sign in to access your Dashboard
      </h2>

      <SignInButton />
    </div>
  );
}
