import { getUser } from "@/controllers/user";
import { ProfileClient } from "./client";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    return <div className="p-6 text-center">Unauthorized</div>;
  }

  return (
    <main>
      <ProfileClient
        user={{
          id: user._id?.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          budget: user.budget,
        }}
      />
    </main>
  );
}
