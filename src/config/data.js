import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost:27017/resApi")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));