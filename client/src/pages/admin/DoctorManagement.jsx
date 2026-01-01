import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
    experienceYears: "",
    departmentId: "",
  });

  const loadData = async () => {
    const dRes = await api.get("/doctors");
    const deptRes = await api.get("/departments");

    setDoctors(dRes.data);
    setDepartments(deptRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitDoctor = async (e) => {
    e.preventDefault();

    try {
      await api.post("/doctors", {
        name: form.name,
        email: form.email,
        password: "Doctor@123",
        specialization: form.specialization,
        experienceYears: Number(form.experienceYears),
        departmentId: form.departmentId,
      });

      setForm({
        name: "",
        email: "",
        specialization: "",
        experienceYears: "",
        departmentId: "",
      });

      loadData();
    } catch (err) {
      console.error("DOCTOR CREATE ERROR:", err.response?.data);
      alert(err.response?.data?.error || "Doctor registration failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Doctor Management</h1>

      {/* CREATE DOCTOR */}
      <form
        onSubmit={submitDoctor}
        className="bg-white p-4 rounded shadow grid md:grid-cols-5 gap-4"
      >
        <input
          placeholder="Doctor Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          className="border p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Specialization"
          className="border p-2"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          required
        />

        <input
          placeholder="Experience (years)"
          type="number"
          className="border p-2"
          value={form.experienceYears}
          onChange={(e) =>
            setForm({ ...form, experienceYears: e.target.value })
          }
          required
        />

        <select
          className="border p-2"
          value={form.departmentId}
          onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
          required
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <button className="bg-green-600 text-white py-2 rounded col-span-full">
          Register Doctor
        </button>
      </form>

      {/* DOCTOR LIST */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Registered Doctors</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Specialization</th>
              <th className="p-2 border">Experience</th>
              <th className="p-2 border">Department</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d._id}>
                <td className="p-2 border">{d.userId?.name}</td>
                <td className="p-2 border">{d.userId?.email}</td>
                <td className="p-2 border">{d.specialization}</td>
                <td className="p-2 border">{d.experienceYears}</td>
                <td className="p-2 border">{d.departmentId?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function DoctorManagement() {
//   const [doctors, setDoctors] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     specialization: "",
//     departmentId: "",
//   });

//   const loadData = async () => {
//     const dRes = await api.get("/doctors");
//     const deptRes = await api.get("/departments");
//     setDoctors(dRes.data);
//     setDepartments(deptRes.data);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const submitDoctor = async (e) => {
//     e.preventDefault();

//     await api.post("/doctors", {
//       ...form,
//       password: "Doctor@123",
//     });

//     setForm({
//       name: "",
//       email: "",
//       specialization: "",
//       departmentId: "",
//     });

//     loadData();
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Doctor Management</h1>

//       {/* CREATE DOCTOR */}
//       <form
//         onSubmit={submitDoctor}
//         className="bg-white p-4 rounded shadow grid md:grid-cols-4 gap-4"
//       >
//         <input
//           placeholder="Doctor Name"
//           className="border p-2"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//         <input
//           placeholder="Email"
//           className="border p-2"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required
//         />
//         <input
//           placeholder="Specialization"
//           className="border p-2"
//           value={form.specialization}
//           onChange={(e) => setForm({ ...form, specialization: e.target.value })}
//           required
//         />
//         <select
//           className="border p-2"
//           value={form.departmentId}
//           onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
//           required
//         >
//           <option value="">Select Department</option>
//           {departments.map((d) => (
//             <option key={d._id} value={d._id}>
//               {d.name}
//             </option>
//           ))}
//         </select>

//         <button className="bg-green-600 text-white py-2 rounded col-span-full">
//           Register Doctor
//         </button>
//       </form>

//       {/* DOCTOR LIST */}
//       <div className="bg-white rounded shadow p-4">
//         <h2 className="font-semibold mb-2">Registered Doctors</h2>
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Specialization</th>
//               <th className="p-2 border">Department</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctors.map((d) => (
//               <tr key={d._id}>
//                 <td className="p-2 border">{d.name}</td>
//                 <td className="p-2 border">{d.specialization}</td>
//                 <td className="p-2 border">{d.department?.name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
