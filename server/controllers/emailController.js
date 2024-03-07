const asyncHandler = require("express-async-handler");
const transporter = require("../config/emailTransporter");

const sendEmail = asyncHandler(async (req, res) => {
  const { selectedRows } = req.body;

  if (!selectedRows || selectedRows.length === 0) {
    res.status(400);
    throw new Error("Data not exist ");
  }
  const tableRows = selectedRows
    .map((row) => {
      return `<tr>
      <td>${row.username}</td>
      <td>${row.phone}</td>
      <td>${row.email}</td>
      <td>${row.hobbies}</td>
    </tr>`;
    })
    .join("");

  const tableHtml = `
    <table border="1">
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Hobbies</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  // Mail content
  const mailOptions = {
    from: "shahidkhatriii34@gmail.com",
    to: "info@redpositive.in",
    subject: "Successful Submission of Selected Data - Mo. Shahid Khatri",
    html: `<p>Selected data: </p>${tableHtml}`,
  };

  //   Sending email
  try {
    const { response } = await transporter.sendMail(mailOptions);
    console.log("Email sent:", response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});
module.exports = { sendEmail };
