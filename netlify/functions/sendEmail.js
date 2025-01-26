const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { name, email, phone, subject, message } = JSON.parse(event.body);

    // Validate inputs
    if (!name || !email || !phone || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "All fields are required" }),
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `${name} <${email}>`, // User's email in the 'from' field
      to: process.env.EMAIL_USER, // Your email where the message is sent
      replyTo: email, // The sender's (user's) email address to reply to
      subject: `New Contact Form Message: ${subject}`, // Subject from the form
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Message</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
            Sent from sankohtech.com contact form<br>
            Time: ${new Date().toISOString()}
          </p>
        </div>
      `,
    };
    // Send email
    await transporter.verify();
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Message sent successfully!",
      }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to send message. Please try again.",
      }),
    };
  }
};
