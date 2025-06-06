import mongoose, { model } from "mongoose";
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // ✅ ADD THIS
    password: { type: String, required: true },
    id: { type: String }
});

export default mongoose.model("User",userSchema);