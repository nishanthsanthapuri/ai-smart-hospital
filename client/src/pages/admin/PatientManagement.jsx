import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
  });

  const loadPatients = async () => {
    const res = await api.get("/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const submitPatient = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create login user
      const userRes = await api.post("/admin/create-patient-login", {
        name: form.name,
        email: form.email,
        password: "Temp@123",
      });

      // 2️⃣ Register patient profile (LINK USER)
      await api.post("/patients", {
        user: userRes.data.userId, // 🔥 FIX
        name: form.name,
        age: Number(form.age),
        gender: form.gender,
        phone: form.phone,
      });
      alert(
        `Patient created successfully.\n\nLogin Credentials:\nEmail: ${form.email}\nPassword: Temp@123`
      );

      setForm({ name: "", age: "", gender: "", phone: "", email: "" });
      loadPatients();
    } catch (err) {
      console.error("PATIENT CREATE ERROR:", err.response?.data);
      alert(err.response?.data?.error || "Patient registration failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Patient Management</h1>

      <form
        onSubmit={submitPatient}
        className="bg-white p-4 rounded shadow grid md:grid-cols-5 gap-4"
      >
        <input
          placeholder="Name"
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
          placeholder="Age"
          type="number"
          className="border p-2"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />

        <select
          className="border p-2"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          placeholder="Phone"
          className="border p-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <button className="bg-blue-600 text-white py-2 rounded col-span-full">
          Register Patient
        </button>
      </form>

      {/* PATIENT LIST */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-3">Registered Patients</h2>

        {patients.length === 0 ? (
          <p className="text-gray-500">No patients registered yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p._id}>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.user?.email || "—"}</td>
                  <td className="border p-2">{p.age}</td>
                  <td className="border p-2">{p.gender}</td>
                  <td className="border p-2">{p.phone}</td>
                  <td className="border p-2">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";

// import api from "../../api/axios";

// export default function PatientManagement() {
//   const [patients, setPatients] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     phone: "",
//   });

//   const loadPatients = async () => {
//     const res = await api.get("/patients");
//     setPatients(res.data);
//   };

//   useEffect(() => {
//     loadPatients();
//   }, []);

//   const submitPatient = async (e) => {
//     e.preventDefault();

//     try {
//       // 1️⃣ Create patient login
//       const loginRes = await api.post("/admin/create-patient-login", {
//         name: form.name,
//         email: `${form.phone}@patient.local`,
//         password: "Temp@123",
//       });

//       const userId = loginRes.data.userId;

//       // 2️⃣ Create patient medical record (IMPORTANT FIX)
//       await api.post("/patients", {
//         name: form.name,
//         age: Number(form.age),
//         gender: form.gender,
//         phone: form.phone,
//         user: userId, // 🔥 THIS FIXES DUPLICATE KEY ERROR
//       });

//       setForm({ name: "", age: "", gender: "", phone: "" });
//       loadPatients();
//     } catch (err) {
//       console.error("PATIENT CREATE ERROR:", err.response?.data);
//       alert(err.response?.data?.error || "Patient registration failed");
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Patient Registration</h1>

//       {/* REGISTER PATIENT */}
//       <form
//         onSubmit={submitPatient}
//         className="bg-white p-4 rounded shadow grid md:grid-cols-4 gap-4"
//       >
//         <input
//           placeholder="Name"
//           className="border p-2"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />

//         <input
//           placeholder="Age"
//           type="number"
//           className="border p-2"
//           value={form.age}
//           onChange={(e) => setForm({ ...form, age: e.target.value })}
//           required
//         />

//         <select
//           className="border p-2"
//           value={form.gender}
//           onChange={(e) => setForm({ ...form, gender: e.target.value })}
//           required
//         >
//           <option value="">Gender</option>
//           <option>Male</option>
//           <option>Female</option>
//           <option>Other</option>
//         </select>

//         <input
//           placeholder="Phone"
//           className="border p-2"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           required
//         />

//         <button className="bg-blue-600 text-white py-2 rounded col-span-full">
//           Register Patient
//         </button>
//       </form>

//       {/* PATIENT LIST */}
//       <div className="bg-white rounded shadow p-4">
//         <h2 className="font-semibold mb-2">Patients</h2>
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Age</th>
//               <th className="border p-2">Gender</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {patients.map((p) => (
//               <tr key={p._id}>
//                 <td className="border p-2">{p.name}</td>
//                 <td className="border p-2">{p.age}</td>
//                 <td className="border p-2">{p.gender}</td>
//                 <td className="border p-2">{p.phone}</td>
//                 <td className="border p-2">{p.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
