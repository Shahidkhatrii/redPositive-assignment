const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username"],
    },
    phone: {
      type: String,
      required: [true, "Please add phone number"],
    },
    email: {
      type: String,
      required: [true, "Please add email address"],
      unique: [true, "Email address already exist"],
    },
    hobbies: {
      type: String,
      required: [true, "Please add hobbies"],
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
