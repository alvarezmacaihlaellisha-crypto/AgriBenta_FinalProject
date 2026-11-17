const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Error:", err));

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role: { type: String, default: 'Buyer' }
});
const User = mongoose.model('User', userSchema);


app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;
        const newUser = new User({ fullName, email, password, phone });
        await newUser.save();
        res.status(201).json({ message: "Successfully Registered!" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));