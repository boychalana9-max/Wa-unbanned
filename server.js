const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Configure your email (Gmail example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your.email@gmail.com',      // replace with your email
        pass: 'your_email_app_password'    // generate App Password if 2FA enabled
    }
});

app.post('/send-email', (req, res) => {
    const { number, message } = req.body;

    if(!number || !message) {
        return res.status(400).json({ error: 'Number and message are required' });
    }

    const mailOptions = {
        from: 'your.email@gmail.com',
        to: 'support@whatsapp.com',
        subject: `Request to Unban WhatsApp Account: ${number}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.json({ success: 'Email sent successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
