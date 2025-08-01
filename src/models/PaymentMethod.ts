import mongoose, { Schema, Document } from "mongoose";

export interface IPaymentMethod extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
}

const PaymentMethodSchema = new Schema<IPaymentMethod>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    name: String,
  },
  { timestamps: true }
);

PaymentMethodSchema.index({ userId: 1, name: 1 }, { unique: true });

export const PaymentMethod =
  mongoose.models.PaymentMethod ||
  mongoose.model<IPaymentMethod>("PaymentMethod", PaymentMethodSchema);
