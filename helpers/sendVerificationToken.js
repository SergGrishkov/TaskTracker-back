import sendEmail from "./sendEmail.js";

async function sendVerificationToken(email, verificationToken) {
  const { BASE_FROM_EMAIL, BASE_URL } = process.env;
  const verificationEmail = {
    to: email,
    from: BASE_FROM_EMAIL,
    subject: "Welcome!",
    http: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
    text: `To confirm your registration please open the link ${BASE_URL}/users/verify/${verificationToken}`,
  };

  await sendEmail(verificationEmail);
}

export default sendVerificationToken;
