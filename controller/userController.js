const asyncHandler = require("express-async-handler")
const validator = require("validator")
const sendEmail = require("../utils/email")
const User = require("../modals/User")

exports.emailSendByUser = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate the fields if needed
    // ...

    // Construct the HTML content with styles
    const styledServer = ` <html>
    <head>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                color: #333;
            }
            h1 {
                color: #007BFF;
            }
            p {
                font-size: 16px;
                line-height: 1.6;
                color: #555;
            }
            .phone-number {
                background-color: #87CEEB;
                padding: 10px;
                display: inline-block;
                color:white;
            }
            .center-text {
                text-align: left;
            }

            .left-text {
                text-align: left;
            }
            
            .signature {
                margin-top: 20px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <p class="left-text" style="font-weight: bold;">Hello, ${name},</p>
        <p class="center-text phone-number">
            Phone Number: <a href="tel:+918080038540">+91 8080038540</a>
        </p>
        <p class="center-text">
            Thank you for reaching out! Your message has been received.
            <br>
            I'll get back to you soon!
        </p>
        <p class="center-text signature">Best regards,<br>Vishal Pal</p>
    </body>
</html>
            `


    const styledClient = `
    <html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h3 {
            color: #007BFF;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
        }

        .email {
            color: #007BFF;
        }
    </style>
</head>
<body>

    <div class="container">
        <h3>Hi, I'm ${name}</h3>
        <p class="email">Email: ${email}</p>
        <p>${message}</p>
    </div>

</body>
</html>

    `


    // Send the email to me
    await sendEmail({
        to: process.env.FROM_EMAIL,
        html: styledClient,
        subject: subject,
    });



    //Done
    //Send email to client
    await sendEmail({
        to: email,
        html: styledServer,
        subject: `Thank You For Contacting`
    });

    // Optionally, you can save the user data to the database
    // const result = await User.create(req.body);

    res.status(201).json({ message: "Email Send Success" });
});
