import { app } from "./app.js";
import connectDB from "./db/connectDB.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Running Ports http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => console.log("MongoDB Connection Error !! ", err?.message));
