const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
    const { user_name, user_email, movie_name, seats } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "suryanravi738@gmail.com",  // Your Gmail
            pass: "dtny lqzi mhdo zmrh"       // App Password
        }
    });

    const mailOptions = {
        from: "suryanravi738@gmail.com",     // Sender's email (match the user email)
        to: user_email,                      
        subject: "Movie Seat Confirmation",
        text: `Hello ${user_name}, your seats for ${movie_name} are confirmed: ${seats.join(", ")}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Email Sent Successfully!");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error sending email.");
    }
});

app.listen(5000, () => console.log("Running on http://localhost:5000"));
