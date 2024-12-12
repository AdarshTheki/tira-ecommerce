import Stripe from "stripe";

export const DB_NAME = "fullStack-E-Commerce-App";

export const stripe = new Stripe(
    "sk_test_51PJfyGSEX6kzN9W0ixP3BuQVJyBSNir2U6f4wPE4XoGHQR4yXzEuUB8DdKkjK1mQaSDXtOSsmesglfK1LUmldaVk00skNsQRvt",
    { apiVersion: "2024-04-10" }
);
