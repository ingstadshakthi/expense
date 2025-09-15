import { getUser } from "@/controllers/user";

export default async function ProfileExpensePage() {
  const user = await getUser();
  if (!user) {
    return <div className="p-6 text-center">Unauthorized</div>;
  }

  return <main className="mx-auto max-7xl"></main>;
}
