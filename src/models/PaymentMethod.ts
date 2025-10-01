import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPaymentType extends Document {
  user: Types.ObjectId;
  name: string;
  color: string;
}

const PaymentTypeSchema = new Schema<IPaymentType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    color: { type: String, default: "#9ca3af" },
  },
  { timestamps: true }
);

export const PaymentType: Model<IPaymentType> =
  mongoose.models.PaymentType ||
  mongoose.model<IPaymentType>("PaymentType", PaymentTypeSchema);
