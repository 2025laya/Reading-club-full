require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

async function makeAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        const email = "admin@readingClub.com";

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return;
        }

        user.role = "admin";
        await user.save();

        console.log("User is now admin:", user.email);

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

makeAdmin();