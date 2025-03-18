const SibApiV3Sdk = require('sib-api-v3-sdk');

// Hardcoded SendinBlue API Key
const apiKey = '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';  // Replace with your actual SendinBlue API Key

// Hardcoded phone number (replace with the phone number to which you want to send SMS)
const phoneNumber = '+44 07564222605'; // Replace with the phone number (in international format)

// Initialize SendinBlue API
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;

// Create an instance of the SMS API
const smsApi = new SibApiV3Sdk.TransactionalSMSApi();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const message = 'Hello, this is a free test message from your website!';

    const sendSMSG = {
      sender: 'YourSenderName', // The sender's name or number
      recipient: phoneNumber,
      content: message,
    };

    try {
      // Send SMS using SendinBlue API
      const response = await smsApi.sendTransacSms(sendSMSG);

      // Check the response for success
      if (response && response.message) {
        res.status(200).json({ status: 'Message sent successfully!' });
      } else {
        res.status(500).json({ status: 'Error sending message', error: response });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'Error', error: error.message });
    }
  } else {
    res.status(405).json({ status: 'Method Not Allowed' });
  }
};
