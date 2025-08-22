import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 
function App() {
const [formData, setFormData] = useState({ name: "", email: "", course: "" });
const [students, setStudents] = useState([]);
useEffect(() => {
fetchStudents();
}, []);
const fetchStudents = async () => {
const res = await axios.get("http://localhost:5000/api/students");
setStudents(res.data);
};
const handleSubmit = async (e) => {
e.preventDefault();
await axios.post("http://localhost:5000/api/students/register", formData);
setFormData({ name: "", email: "", course: "" });
fetchStudents();
};
return (
<div style={{ padding: "20px" }}>
<h2>Student Registration</h2>
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Name"
value={formData.name}
onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/><br /><br />
<input
type="email"
placeholder="Email"
value={formData.email}
onChange={(e) => setFormData({ ...formData, email: e.target.value })}
/><br /><br />
<input
type="text"
placeholder="Course"
value={formData.course}
onChange={(e) => setFormData({ ...formData, course: e.target.value })}
/><br /><br />
<button type="submit">Register</button>
</form>
<h2>Registered Students</h2>
<table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
<thead>
<tr>
<th>Name</th><th>Email</th><th>Course</th>
</tr>
</thead>
<tbody>
{students.map((s, index) => (
<tr key={index}>
<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.course}</td>
</tr>))}
</tbody>
</table>
</div>
);
}

export default App;
