import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "lysbrodya@gmail.com" };
  await sgMail.send(email);
  return true;
};
export default sendEmail;
