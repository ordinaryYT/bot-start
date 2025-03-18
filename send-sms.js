const twilio = require('twilio');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const accountSid = process.env.TWILIO_ACCOUNT_SID; // Use environment variables for sensitive data
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = new twilio(accountSid, authToken);
        
        const phoneNumber = process.env.PHONE_NUMBER; // Recipient phone number
        const message = 'Hello, this is a test message from your website!';
        
        try {
            const messageResponse = await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
                to: phoneNumber
            });

            res.status(200).json({ status: 'Message sent', sid: messageResponse.sid });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'Error', error: error.message });
        }
    } else {
        res.status(405).json({ status: 'Method Not Allowed' });
    }
};
