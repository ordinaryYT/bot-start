const SibApiV3Sdk = require('sib-api-v3-sdk');

// Initialize SendinBlue API
const apiKey = process.env.SENDINBLUE_API_KEY;  // Your SendinBlue API key
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;

// Create an instance of the SMS API
const smsApi = new SibApiV3Sdk.TransactionalSMSApi();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const phoneNumber = process.env.PHONE_NUMBER;  // Phone number to receive SMS
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
