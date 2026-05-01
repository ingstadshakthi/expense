import { ExpenseManager } from "@/components/page/expense-manager";
import { getUserExpenseTypes } from "@/controllers/profile/action";

export default async function ProfileExpensePage() {
  const expenseTypes = await getUserExpenseTypes();
  return (
    <article>
      <ExpenseManager expenseTypes={expenseTypes} />
    </article>
  );
}
