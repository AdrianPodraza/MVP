const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Ustaw w pliku .env
const authToken = process.env.TWILIO_AUTH_TOKEN; // Ustaw w pliku .env
const twilioNumber = process.env.TWILIO_PHONE_NUMBER; // Ustaw w pliku .env

const client = twilio(accountSid, authToken);

const sendSms = (to, message) => {
  return client.messages.create({
    body: message,
    from: twilioNumber,
    to: to,
  });
};

module.exports = { sendSms };
