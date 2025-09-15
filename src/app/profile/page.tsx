import { getUser } from "@/controllers/user";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    return <div className="p-6 text-center">Unauthorized</div>;
  }

  // const [expenseTypes, paymentMethods] = await Promise.all([
  //   getExpense(user.id),
  //   getPayment(user.id),
  // ]);

  return (
    <main className="mx-auto max-7xl">
      {/* <ProfileClient
        expenseTypes={expenseTypes}
        paymentMethods={paymentMethods}
      /> */}
    </main>
  );
}
