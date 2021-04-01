const Message = require("../model/MessageSchema");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });

exports.postMessage = async (req, res) => {
  const { name, email, contactmessage } = req.body;
  let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // do simple validation
  if (name === "") {
    return res.status(400).json({ error: "Name Should Not Be Blank" });
  }
  if (!regName.test(name)) {
    return res
      .status(400)
      .json({ error: "Incorrect Name Format,Add a first name" });
  }
  if (!email || email === "") {
    return res.status(400).json({ error: "Email Should Not Be Blank" });
  }
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid Email Format" });
  }
  if (!contactmessage || contactmessage === "") {
    return res.status(400).json({ error: "Please Leave A Message,Thank You" });
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
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "josephchinemerem564@gmail.com",
        pass: "myWihu3B4E_",
      },
    });

    const mailOptions = {
      from: email,
      to: "josephchinemerem564@gmail.com",
      subject: `Portfolio Message from ${email}.`,
      text: contactmessage,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    const response = await newMessage.save();

    res.status(200).json({ message: "Message Sent,I'll Be In Touch Shortly." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to Send Message,Try Again Please" });
  }
};

exports.getHome = (req, res) => {
  res.status(200).json({ message: "Welcome to portfolio server" });
};
