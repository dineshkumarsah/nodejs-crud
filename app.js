const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();
dbName = 'mydb1'
app.use(express.json());
mongoose.connect(`mongodb+srv://root:root@cluster0.onvq69i.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use('/user', Router);

app.listen(3001, () => {
    console.log("Server is running at port 3001");
});