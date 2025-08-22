const express=require("express");
const mongoose= require("mongoose");
const cors=require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://admin:admin@cluster0.8xkd0ks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("x Error: " + err));
const StudentSchema = new mongoose.Schema({ name: String,
email: String,
course: String
});
const Student = mongoose.model("Student", StudentSchema);
app.post("/api/students/register", async (req, res) => {
try {
const student = new Student(req.body);
await student.save();
res.json({ message:"Student registered successfully", student });
} catch (error) {
res.status(500).json({ error: error.message });
}
});
app.get("/api/students", async (req, res) => {
try {
const students = await Student.find();
res.json(students);
} catch (error) {
res.status(500).json({ error: error.message });
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
