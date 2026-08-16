require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const gamificationRoutes = require("./gamification/gamificationRoutes");
const bookRoutes = require("./routes/book");
const adminRoutes = require("./routes/admin");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

console.log("MONGO:", process.env.MONGO_URL);

// =========================
// DNS
// =========================

const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

// =========================
// SOCKET.IO
// =========================

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("sendMessage", (data) => {

        console.log("message received:", data);

        io.emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);

    });
});

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());

app.set("io", io);

// =========================
// ROUTES
// =========================

app.use(
    "/api/gamification",
    gamificationRoutes
);

app.use(
    "/api",
    require("./routes/auth")
);

app.use(
    "/api/books",
    require("./routes/book")
);

app.use(
    "/api/messages",
    require("./routes/message")
);

app.use(
    "/api/summary",
    require("./routes/summary")
);

app.use(
    "/api/site-comments",
    require("./routes/siteComment")
); 

app.use(
    "/api/site-rating",
    require("./routes/siteRating")
);

app.use(
    "/api/reports",
    require("./routes/report")
);

app.use(
    "/api/user",
    require("./routes/userActions")
);

app.use(
    "/api/admin",
    adminRoutes
);

app.use(
    "/uploads",
    express.static("uploads")
);

app.use(
    "/books",
    bookRoutes
);

// =========================
// HOME
// =========================

app.get("/", (req, res) => {

    res.send("welcome to reading club API");

});

// =========================
// MONGODB
// =========================

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {

        console.log("MongoDB connected");

    })
    .catch((err) => {

        console.log(
            "MongoDB connection error:",
            err
        );

    });

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(
        `server running on port ${PORT}`
    );

});

console.log(
    "MongoDB state:",
    mongoose.connection.readyState
);