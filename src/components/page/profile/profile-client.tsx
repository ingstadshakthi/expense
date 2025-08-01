"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExpenseForm } from "./expense-form";

type Props = {
  expenseTypes: string[];
  paymentMethods: string[];
};

export default function ProfileClient({ expenseTypes, paymentMethods }: Props) {
  const [types, setTypes] = useState(expenseTypes);
  const [methods, setMethods] = useState(paymentMethods);

  function handleAddNewExpense(name: string) {
    setTypes((prev) => [...prev, name]);
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-xl w-full mx-auto">
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-semibold">Expense Types</h2>
        </CardHeader>
        <CardContent>
          {types.map((type) => (
            <div key={type} className="flex items-center justify-between mb-2">
              <span>{type}</span>
              <div className="space-x-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {/* Add New */}

          <ExpenseForm handleAddNewExpense={handleAddNewExpense} />
        </CardContent>
      </Card>

      {/* Payment Methods */}
      {/* <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-semibold">Payment Methods</h2>
        </CardHeader>
        <CardContent>
          {methods.map((method) => (
            <div
              key={method}
              className="flex items-center justify-between mb-2"
            >
              <span>{method}</span>
              <div className="space-x-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4 space-y-2">
            <Input placeholder="Payment name (e.g., HDFC Card)" />
            <Input placeholder="Type (Bank, Card, UPI, Cash)" />
            <Button className="w-full">Add</Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
