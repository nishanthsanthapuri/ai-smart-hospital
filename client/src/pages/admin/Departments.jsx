import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Fetch departments (ADMIN, DOCTOR)
  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      setError("Failed to load departments");
    }
  };

  // 🔹 Create department (ADMIN, SUPER_ADMIN)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/departments", {
        name,
        description,
      });

      setName("");
      setDescription("");
      setSuccess("Department added successfully");
      fetchDepartments();
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Department already exists");
      } else if (err.response?.status === 400) {
        setError("Department name is required");
      } else {
        setError("Failed to create department");
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Departments</h1>

      {/* 🔹 Create Department Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 max-w-xl"
      >
        <h2 className="font-semibold mb-3">Add Department</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <input
          type="text"
          placeholder="Department name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-3"
          required
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Department
        </button>
      </form>

      {/* 🔹 Departments Table */}
      <table className="w-full border bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">#</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No departments found
              </td>
            </tr>
          ) : (
            departments.map((dept, index) => (
              <tr key={dept._id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2 font-medium">{dept.name}</td>
                <td className="border p-2">{dept.description || "—"}</td>
                <td className="border p-2">
                  {new Date(dept.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
