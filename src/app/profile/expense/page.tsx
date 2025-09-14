import { getExpense } from "@/controllers/expense-type";
import { getUser } from "@/controllers/user";

export default async function ProfileExpensePage() {
  const user = await getUser();
  if (!user) {
    return <div className="p-6 text-center">Unauthorized</div>;
  }

  const expenseTypes = await getExpense(user.id);

  return <main className="mx-auto max-7xl"></main>;
}
