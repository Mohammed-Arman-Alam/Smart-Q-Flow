import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { CheckCircle, Circle } from "lucide-react";

const steps = [
  { label: "Register", key: "pending" },
  { label: "Waiting", key: "assigned" },
  { label: "Called", key: "waiting" },
  { label: "In Consult", key: "in-progress" },
  { label: "Done", key: "completed" },
];

const PatientStatus= ()=> {
    const Axios = useAxios();
    const [appointmentId, setAppointmentId] = useState("");
    const [status, setStatus] = useState(null);

    const handleSearch = async () => {
      const res = await Axios.get(`/appointment/${appointmentId}`);
      console.log(res.data);
      setStatus(res.data.status);
    };

    const getIndex = (status) => {
    return steps.findIndex(step => step.key === status);
    };
    const currentStep = getIndex(status);
  return (
    <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-center mb-5">
        Patient Status Tracker
        </h1>

        <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="bg-[#006341] text-white p-1 rounded-lg">
          Search
        </button>
        </div>
        <div className="my-8 ">
          <ol className="flex items-center w-full">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <li key={index} className="flex items-center w-full">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-full border-2
                      ${
                        isCompleted || isActive
                          ? "bg-[#006341] text-white border-primary ring-4 ring-primary/20"
                          : "bg-background text-muted-foreground border-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>

                    <span
                      className={`mt-2 text-xs whitespace-nowrap
                      ${
                        isCompleted || isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2
                      ${index < currentStep ? "bg-primary" : "bg-muted"}`}
                    ></div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
    </div>
  );
}

export default PatientStatus;


