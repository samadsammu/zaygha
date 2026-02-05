const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const nodemailer = require('nodemailer');

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
    try {
        const { user, items, totalAmount, paymentMethod } = req.body;

        const newOrder = new Order({
            user,
            items,
            totalAmount,
            paymentMethod
        });

        const savedOrder = await newOrder.save();

        // --- Email Notification Logic ---
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            console.log(`[Email Notification] Sending to: aneeshfarzan@gmail.com`);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'aneeshfarzan@gmail.com', // Override recipient as requested
                subject: 'New Order Received - Zaygha Designs',
                text: `New Order Placed!\n\nOrder ID: ${savedOrder._id}\nCustomer: ${user.name} (${user.email})\nAddress: ${user.address}, ${user.city}\nTotal Amount: ₹${totalAmount}\n\nItems:\n${items.map(i => `- ${i.name} (x${i.quantity})`).join('\n')}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.log('Email error:', error);
                else console.log('Email sent:', info.response);
            });
        } else {
            console.log('[Email Notification] Skipped: EMAIL_USER/PASS not set in .env');
        }

        res.status(201).json({ message: 'Order placed successfully', orderId: savedOrder._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
