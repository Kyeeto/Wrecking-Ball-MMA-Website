require('dotenv').config();
const express = require ('express');
const cors = require('cors');
const {Resend} = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/contact', async function(req, res) {
    const {firstName, lastName, email, phone, message} = req.body;

    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'kylerehling@gmail.com', 
            subject: "New contact Form Submission - Wrecking Ball MMA", 
            html: `
                <h2>New Contact Form Submission </h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });

        await resend.emails.send({
            from: 'onboarding@resend.dev', 
            to: email, 
            subject: 'We have received your message - Wrecking Ball MMA', 
            html: `
                <h2>Hey ${firstName}, </h2>
                <p>We received your message and will get back to you as soon as possible.</p>
                <p>Thanks for reaching out to Wrecking Ball MMA</p>
            `
        });

        res.json({success: true})
    } catch(error){
        console.error(error);
        res.status(500).json({success: false, error: error.message});
    }
});

app.listen(3000, function(){
    console.log('Server runnning on port 3000')
});