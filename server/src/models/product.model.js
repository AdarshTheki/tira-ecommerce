import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // Or you can use reference to Category model
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String },
    images: [{ type: String }], // Array of cloudinary image URLs
});

productSchema.plugin(aggregatePaginate);

export const Product = mongoose.model("Product", productSchema);
