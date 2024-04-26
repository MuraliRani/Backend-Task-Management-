const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("Server is Running...............")
})
// mongoose configuration
mongoose.set('strictQuery', false);

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, (err) => {
  if (err) throw  err;
  console.log("Mongodb Connected Successfully...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);


// Logout route
app.post("/api/logout", (req, res) => {
  // Clear the token cookie
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({ status: true, msg: "Logout successful" });
});


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
