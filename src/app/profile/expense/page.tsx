import { ExpenseManager } from "@/components/page/expense-manager";
import { getUserExpenseTypes } from "@/controllers/profile";

export default async function ProfileExpensePage() {
  const expenseTypes = await getUserExpenseTypes();
  console.log({ expenseTypes });
  return (
    <article className="mx-auto max-7xl">
      <ExpenseManager expenseTypes={expenseTypes} />
    </article>
  );
}
