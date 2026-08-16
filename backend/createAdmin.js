const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({
      email: "admin@readingClub.com"
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin4", 10);

    const admin = new User({
      name: "Admin",
      lastName: "ReadingClub",
      email: "admin@readingClub.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("Admin created successfully!");
    console.log("Email: admin@readingClub.com");
    console.log("Password: admin4");

    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

createAdmin();