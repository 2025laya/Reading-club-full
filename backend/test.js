const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("receiveMessage", (data) => {
    console.log("received:", data);
});

socket.on("connect", () => {
    console.log("connected");

    setTimeout(() => {
        socket.emit("sendMessage", {
            text: "hello from test",
            sender: "tester"
        });
    }, 1000);
});

setTimeout(() => {
    console.log("test finished");
}, 5000);