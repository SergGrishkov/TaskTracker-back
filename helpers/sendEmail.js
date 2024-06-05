import nodemailer from "nodemailer";

const { UKR_PASSWORD, BASE_FROM_EMAIL } = process.env;
if (!BASE_FROM_EMAIL || !UKR_PASSWORD) {
  throw new Error(
    "BASE_FROM_EMAIL and UKR_PASSWORD must be defined in your .env file"
  );
}

const transport = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  auth: {
    user: BASE_FROM_EMAIL,
    pass: UKR_PASSWORD,
  },
});

async function sendEmail(message) {
  return await transport.sendMail(message);
}

export default sendEmail;
