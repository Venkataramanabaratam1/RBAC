import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import owasp from 'owasp-password-strength-test';
import nodemailer from 'nodemailer';
import User from '../models/user.js';

// Configure OWASP to allow 8-14 character passwords
owasp.config({
    minLength: 8,
    maxLength: 14,
    minOptionalTestsToPass: 3, 
});


export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const passwordTest = owasp.test(password);
    if (!passwordTest.strong) {
        return res.status(400).json({ errors: passwordTest.errors });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.role) {
            console.log(user.role);
            return res.status(400).json({ message: 'User role is not defined' });
        }
        

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true, secure: true }).json({
            message: `Welcome, ${user.role}`,
            role: user.role,
            token,
        });
        
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true }).json({ message: 'Logged out successfully' });
};

export const addRole = async (req, res) => {
    const { name, email, role } = req.body;

    // Generate a temporary password of random length (8-14 characters) with special characters
    const generateTempPassword = (length) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const tempPasswordLength = Math.floor(Math.random() * (14 - 8 + 1)) + 8; // Random length between 8 and 14
    const tempPassword = generateTempPassword(tempPasswordLength);

    try {
        // Hash the temporary password
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Save the user with the hashed password
        const user = await User.create({ name, email, password: hashedPassword, role });

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send the email with the temporary password
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Temporary Password from Role based management system! ',
            text: `Dear ${name},

Welcome to Roled Based Management System!

We are excited to have you on board. As part of your account setup, please find your temporary password below:

Temporary Password: ${tempPassword}

Thankyou for joining!`,
        });

        res.status(201).json({ message: 'Role added and email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding role', error: err.message });
    }
};

