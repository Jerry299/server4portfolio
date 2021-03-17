const Message = require("../model/MessageSchema");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });

exports.postMessage = async (req, res) => {
  const { name, email, contactmessage } = req.body;
  let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // do simple validation
  if (name === "") {
    return res.status(400).json({ message: "Name Should Not Be Blank" });
  }
  if (!regName.test(name)) {
    return res
      .status(400)
      .json({ message: "Incorrect Name Format,Add a first name" });
  }
  if (!email || email === "") {
    return res.status(400).json({ message: "Email Should Not Be Blank" });
  }
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Invalid Email Format" });
  }
  if (!contactmessage || contactmessage === "") {
    return res
      .status(400)
      .json({ message: "Please Leave A Message,Thank You" });
  }
  // validation ends

  try {
    const newMessage = new Message({
      name,
      email,
      contactmessage,
      timeSent: new Date(),
    });
    // send message to my mail

    console.log("email is equal to ", process.env.EMAIL);
    console.log("entry is equal to ", process.env.PASS);
    const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.mail.yahoo.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: `Portfolio Message from ${email}.`,
      text: contactmessage,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(400).json({ message: "MEssage Not Sent." });
      } else {
        console.log(info);
      }
    });

    const response = await newMessage.save();

    res.status(200).json({ message: "Message Sent,I'll Be In Touch Shortly." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Unable to Send Message,Try Again Please" });
  }
};

exports.getHome = (req, res) => {
  res.status(200).json({ message: "Welcome to portfolio server" });
};
