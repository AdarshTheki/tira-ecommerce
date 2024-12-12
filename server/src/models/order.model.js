import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        username: { type: String },
        email: { type: String },
        address: { type: String },
        items: [
            {
                price: Number,
                name: String,
                quantity: Number,
            },
        ],
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
