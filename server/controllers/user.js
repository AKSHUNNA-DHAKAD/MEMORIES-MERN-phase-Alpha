// GO TO STEP :35 ---------------------------------
import express from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" }); // ✅ Fixed: wrapped 'test' in quotes
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something's Wrong hsere Buddy" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    // 🔍 Add logging for debug
    console.log("Request Body:", req.body);
    console.log("password:", password, "| confirmPassword:", confirmPassword);

    try {
        const existingUser = await User.findOne({ email });
        console.log("👤 Found user:", existingUser); // <== LOG THIS

        if (existingUser) {
            console.log("❌ User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        if (password.trim() !== confirmPassword.trim()) {
            console.log("❌ Passwords do not match");
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
            expiresIn: "1h",
        });

        res.status(201).json({ result, token });
    } catch (error) {
        console.log("❌ Signup error:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};
  
