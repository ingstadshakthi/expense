import { getExpensesByMonth } from "@/controllers/expense/action";
import { getUserExpensePaymentDetails } from "@/controllers/profile/action";

interface Props {
  param: { year?: string; month?: string };
  searchParam: { page?: string; expenseType?: string; paymentType?: string };
}

function validateYearMonth(yearParam: string, monthParam: string) {
  const year = Number(yearParam);
  const month = Number(monthParam);

  if (
    isNaN(year) ||
    isNaN(month) ||
    year < 2000 ||
    year > new Date().getFullYear() + 1 ||
    month < 1 ||
    month > 12
  ) {
    throw new Error("Invalid year or month in URL");
  }

  return { year, month };
}

export async function getExpenseData({ param, searchParam }: Props) {
  if (!param.year || !param.month) throw new Error("Year and Month data not available");
  const { year, month } = validateYearMonth(param.year, param.month);
  const page = Number(searchParam.page) || 1;
  const limit = 20;
  const { expenseType, paymentType } = searchParam;
  const [{ records, totalPages }, [expenseTypes, paymentTypes]] = await Promise.all([
    getExpensesByMonth(year, month, page, limit, expenseType?.split(","), paymentType?.split(",")),
    getUserExpensePaymentDetails(),
  ]);
  return {
    records,
    totalPages,
    year,
    month,
    page,
    expenseTypes,
    paymentTypes,
    expenseTypeFilter: expenseType?.split(",") ?? [],
    paymentTypeFilter: paymentType?.split(",") ?? [],
  };
}
