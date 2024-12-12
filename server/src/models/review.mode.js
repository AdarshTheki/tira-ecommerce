import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        minlength: [10, "Comment must be at least 10 char"],
        maxlength: [500, "Comment must be at least 500 char"],
        trim: true,
        required: true,
    },
    date: { type: Date, default: Date.now },
});

reviewSchema.pre("save", function (next) {
    this.date = Date.now();
    next();
});

export const Review = mongoose.model("Review", reviewSchema);
