const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/mern_demo")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  description:String
});
const User = mongoose.model("User", UserSchema);

// Dummy data route (optional: insert data once)
app.post("/add-user", async (req, res) => {
  try {
    const { name, email, description } = req.body; // form data
    const user = new User({ name, email, description });
    await user.save();
    res.send("User Added ✅");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});


// server.js ya index.js (backend)
// update user data
app.put("/", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, description } = req.body;
 
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email,description },
      { new: true } // updated user return karega
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// DELETE user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});


// Get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
