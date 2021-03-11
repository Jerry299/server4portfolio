const Message = require("../model/MessageSchema");

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
    const newMessage = new Message({ name, email, contactmessage });
    const response = await newMessage.save();

    res.status(200).json({ message: "Message Sent Successfully,Thank You" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Unable to Send Message,Try Again Please" });
  }
};
