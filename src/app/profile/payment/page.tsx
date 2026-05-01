import { getUserPaymentTypes } from "@/controllers/profile/action";
import { PaymentManager } from "@/components/page/payment-manager";

export default async function ProfileExpensePage() {
  const paymentTypes = await getUserPaymentTypes();

  return (
    <article>
      <PaymentManager paymentTypes={paymentTypes} />
    </article>
  );
}
