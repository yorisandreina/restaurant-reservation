import { gmail } from "../helpers/gmailClient.js";

export const sendReservationEmail = async ({
  to,
  name,
  date,
  time,
  people,
}) => {
  const subject = "Reservation confirmed ✅";
  const message = `
Hello ${name},

Your reservation is confirmed!

📅 Date: ${date}
⏰ Time: ${time}
👥 People: ${people}

Thank you for choosing us.
`;

  const rawMessage = Buffer.from(
    `To: ${to}\r\n` +
      `Subject: ${subject}\r\n` +
      `Content-Type: text/plain; charset=utf-8\r\n\r\n` +
      message
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: rawMessage,
    },
  });
};
