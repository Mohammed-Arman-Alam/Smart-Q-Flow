import React from "react";
import { useForm} from "react-hook-form";
import Swal from 'sweetalert2';
import useAxios from "../../hooks/useAxios";

const generateTicketNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SQ-${Date.now().toString().slice(-4)}-${random}`;
};

export default function PatientRegistration() {
    const Axios = useAxios();
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();

  const handleAppointment = (data) => {
    const ticketNumber = generateTicketNumber();

    const fullData = {
      ...data,
      ticketNumber,
      time: new Date().toLocaleString(),
      status: 'pending'
    };
    Axios.post('/appointment', fullData)
    .then(res=>{
        Swal.fire({
            title: "🎫 Registration Successful",
            html: `
              <div style="text-align:left">
                <p><strong>Ticket No:</strong> ${fullData.ticketNumber}</p>
                <p><strong>Name:</strong> ${fullData.name}</p>
                <p><strong>Age:</strong> ${fullData.age}</p>
                <p><strong>Gender:</strong> ${fullData.gender}</p>
                <p><strong>Phone:</strong> ${fullData.phone || "N/A"}</p>
                <p><strong>Department:</strong> ${fullData.department}</p>
                <p><strong>Time:</strong> ${fullData.time}</p>
              </div>
            `,
            icon: "success",
            confirmButtonText: "Print Ticket 🖨️",
            confirmButtonColor: "#006341",
            showCancelButton: true,
            cancelButtonText: "Close",
            cancelButtonColor: "#990000",
        }).then((result) => {
        if (result.isConfirmed) {
            printTicket(fullData);
        }
        });
        reset();
    }
    )
    .catch(error=>{
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "Appointment unsuccessful, please try again.",
        });
    })
    
    
  };

  const printTicket = (data) => {
    const printWindow = window.open("", "", "width=400,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Ticket</title>
        </head>
        <body style="font-family:sans-serif; text-align:center;">
          <h2>Hospital Ticket</h2>
          <hr/>
          <p><strong>${data.ticketNumber}</strong></p>
          <p>${data.name}</p>
          <p>Age: ${data.age}</p>
          <p>${data.gender}</p>
          <p>${data.department}</p>
          <p>${data.time}</p>
          <hr/>
          <p>Please wait for your turn</p>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
          <h1 className="text-3xl font-bold text-center text-[#006341]">
            Patient Registration
          </h1>

          <form onSubmit={handleSubmit(handleAppointment)} className="mt-6 space-y-5">

            <div>
              <label>Patient Name *</label>
              <input
                className="w-full border p-2 rounded"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label>Age *</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                {...register("age", { required: "Age is required" })}
              />
              {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>

            <div>
              <label>Gender *</label>
              <select
                className="w-full border p-2 rounded"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>

            <div>
              <label>Phone (Optional)</label>
              <input
                className="w-full border p-2 rounded"
                {...register("phone")}
              />
            </div>

            <div>
              <label>Department *</label>
              <select
                className="w-full border p-2 rounded"
                {...register("department", { required: "Department is required" })}
              >
                <option value="">Select...</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedic</option>
                <option>General</option>
                <option>Medicine</option>
                <option>Surgery</option>
                <option>Gynaecology </option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
              </select>
              {errors.department && (
                <p className="text-red-500">{errors.department.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-xl bg-[#006341] text-white py-2 rounded hover:bg-green-700 hover:scale-105">
              Register & Print Ticket
            </button>
          </form>
        </div>
  );
}