import { Button } from "@/components/ui/button";
import { AddExpenseButton } from "@/components/utils/add-expense";
import ClientLink from "@/components/utils/client-link";

export default async function Dashboard() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return (
    <div>
      <div aria-label="actions" className="my-2 flex justify-end gap-2">
        <ClientLink href={`/expenses/${year}/${month}`}>
          <Button>Expenses</Button>
        </ClientLink>
        <AddExpenseButton />
      </div>
      <div>Dashboard</div>
    </div>
  );
}
