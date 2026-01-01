import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorAvailability() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availability, setAvailability] = useState([]);

  const [form, setForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    slotDuration: 15,
  });

  // 🔹 Load doctors
  const loadDoctors = async () => {
    const res = await api.get("/doctors");
    setDoctors(res.data);
  };

  // 🔹 Load availability for selected doctor
  const loadAvailability = async (doctorId) => {
    if (!doctorId) return;
    const res = await api.get(`/availability/${doctorId}`);
    setAvailability(res.data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    loadAvailability(selectedDoctor);
  }, [selectedDoctor]);

  // 🔹 Submit availability
  const submitAvailability = async (e) => {
    e.preventDefault();

    try {
      await api.post("/availability", {
        doctorId: selectedDoctor,
        dayOfWeek: form.dayOfWeek,
        startTime: form.startTime,
        endTime: form.endTime,
        slotDuration: Number(form.slotDuration),
      });

      setForm({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        slotDuration: 15,
      });

      loadAvailability(selectedDoctor);
    } catch (err) {
      console.error("AVAILABILITY ERROR:", err.response?.data);
      alert(err.response?.data?.error || "Failed to add availability");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Doctor Availability</h1>

      {/* SELECT DOCTOR */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block font-medium mb-2">Select Doctor</label>
        <select
          className="border p-2 w-full"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.userId?.name} ({d.departmentId?.name})
            </option>
          ))}
        </select>
      </div>

      {/* ADD AVAILABILITY */}
      {selectedDoctor && (
        <form
          onSubmit={submitAvailability}
          className="bg-white p-4 rounded shadow grid md:grid-cols-5 gap-4"
        >
          <select
            className="border p-2"
            value={form.dayOfWeek}
            onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
            required
          >
            <option value="">Day</option>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>

          <input
            type="time"
            className="border p-2"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            required
          />

          <input
            type="time"
            className="border p-2"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            required
          />

          <input
            type="number"
            className="border p-2"
            min="5"
            step="5"
            value={form.slotDuration}
            onChange={(e) => setForm({ ...form, slotDuration: e.target.value })}
          />

          <button className="bg-blue-600 text-white rounded px-4">
            Add Availability
          </button>
        </form>
      )}

      {/* AVAILABILITY LIST */}
      {availability.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Existing Availability</h2>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Day</th>
                <th className="border p-2">Start</th>
                <th className="border p-2">End</th>
                <th className="border p-2">Slot (min)</th>
              </tr>
            </thead>
            <tbody>
              {availability.map((a) => (
                <tr key={a._id}>
                  <td className="border p-2">{a.dayOfWeek}</td>
                  <td className="border p-2">{a.startTime}</td>
                  <td className="border p-2">{a.endTime}</td>
                  <td className="border p-2">{a.slotDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";

// import api from "../../api/axios";

// export default function DoctorAvailability() {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState("");
//   const [availability, setAvailability] = useState([]);

//   const [form, setForm] = useState({
//     dayOfWeek: "Monday",
//     startTime: "09:00",
//     endTime: "12:00",
//     slotDuration: 15,
//   });

//   /* LOAD DOCTORS */
//   const loadDoctors = async () => {
//     const res = await api.get("/doctors");
//     setDoctors(res.data);
//   };

//   /* LOAD AVAILABILITY */
//   const loadAvailability = async (doctorId) => {
//     if (!doctorId) return;
//     const res = await api.get(`/availability/${doctorId}`);
//     setAvailability(res.data);
//   };

//   useEffect(() => {
//     loadDoctors();
//   }, []);

//   useEffect(() => {
//     loadAvailability(selectedDoctor);
//   }, [selectedDoctor]);

//   /* SUBMIT AVAILABILITY */
//   const submitAvailability = async (e) => {
//     e.preventDefault();

//     await api.post("/availability", {
//       doctorId: selectedDoctor,
//       ...form,
//     });

//     loadAvailability(selectedDoctor);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Doctor Availability Management</h1>

//       {/* SELECT DOCTOR */}
//       <select
//         className="border p-2 w-full md:w-1/2"
//         value={selectedDoctor}
//         onChange={(e) => setSelectedDoctor(e.target.value)}
//       >
//         <option value="">Select Doctor</option>
//         {doctors.map((d) => (
//           <option key={d._id} value={d._id}>
//             {d.name} — {d.specialization}
//           </option>
//         ))}
//       </select>

//       {/* CREATE AVAILABILITY */}
//       {selectedDoctor && (
//         <form
//           onSubmit={submitAvailability}
//           className="bg-white p-4 rounded shadow grid md:grid-cols-4 gap-4"
//         >
//           <select
//             className="border p-2"
//             value={form.dayOfWeek}
//             onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
//           >
//             {[
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//               "Sunday",
//             ].map((d) => (
//               <option key={d}>{d}</option>
//             ))}
//           </select>

//           <input
//             type="time"
//             className="border p-2"
//             value={form.startTime}
//             onChange={(e) => setForm({ ...form, startTime: e.target.value })}
//           />

//           <input
//             type="time"
//             className="border p-2"
//             value={form.endTime}
//             onChange={(e) => setForm({ ...form, endTime: e.target.value })}
//           />

//           <input
//             type="number"
//             className="border p-2"
//             placeholder="Slot (mins)"
//             value={form.slotDuration}
//             onChange={(e) =>
//               setForm({ ...form, slotDuration: Number(e.target.value) })
//             }
//           />

//           <button className="bg-blue-600 text-white py-2 rounded col-span-full">
//             Add Availability
//           </button>
//         </form>
//       )}

//       {/* AVAILABILITY LIST */}
//       {availability.length > 0 && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="font-semibold mb-2">Existing Availability</h2>

//           <table className="w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">Day</th>
//                 <th className="p-2 border">Time</th>
//                 <th className="p-2 border">Slot (mins)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {availability.map((a) => (
//                 <tr key={a._id}>
//                   <td className="p-2 border">{a.dayOfWeek}</td>
//                   <td className="p-2 border">
//                     {a.startTime} - {a.endTime}
//                   </td>
//                   <td className="p-2 border">{a.slotDuration}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
