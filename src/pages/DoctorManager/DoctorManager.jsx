import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

export default function DoctorManager() {
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const [department, setDepartment] = useState("");

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["rooms", department],

    enabled: !!department,

    queryFn: async () => {
      const res = await Axios.get(`/rooms/${department}`);
      return res.data;
    },
  });

  

  const { data: patients = [] } = useQuery({
    queryKey: ["waitingPatients", department],

    enabled: !!department,

    queryFn: async () => {
      const res = await Axios.get(
        `/appointments/${department}`
      );

      return res.data;
    },
  });

  

  const assignPatientMutation = useMutation({
    mutationFn: async ({ patientId, room }) => {
      return Axios.patch(
        `/appointments/assign/${patientId}`,
        {
          roomId: room._id,
          doctorId: room.doctorId,
          status: "assigned",
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["waitingPatients"],
      });

      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });

      queryClient.invalidateQueries({
        queryKey: ["roomPatients"],
      });
    },
  });

  

  const callNextMutation = useMutation({
    mutationFn: async (roomId) => {
      return Axios.patch(`/appointments/call-next/${roomId}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roomPatients"],
      });

      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold text-[#006341]">
              Doctor Queue Manager
            </h1>
            <p className="text-gray-500 mt-2">
              Manage department rooms and patients
            </p>
          </div>

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm"
          >
            <option value="">
              Select Department
            </option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedic</option>
            <option>General</option>
            <option>Medicine</option>
            <option>Surgery</option>
            <option>Gynaecology</option>
            <option>Pediatrics</option>
            <option>Dermatology</option>
          </select>
        </div>

        {!department && (
          <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-[#006341]">
              No Department Selected
            </h2>

            <p className="text-gray-500 mt-4">
              Select a department to start
              managing patients
            </p>
          </div>
        )}

       

        {department && (
          <div className="grid lg:grid-cols-3 gap-6">

            

            <div className="bg-white rounded-2xl shadow border p-5 h-fit">

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-[#006341]">
                  Waiting Patients
                </h2>

                <span className="bg-[#006341] text-white px-3 py-1 rounded-full text-sm">
                  {patients.length}
                </span>
              </div>

              <div className="space-y-3 max-h-[650px] overflow-auto">

                {patients.length === 0 && (
                  <div className="border-2 border-dashed rounded-xl p-8 text-center text-gray-400">
                    No Waiting Patients
                  </div>
                )}

                {patients.map((patient, index) => (
                  <div
                    key={patient._id}
                    className="border rounded-xl p-4 bg-gray-50"
                  >

                    <div className="flex justify-between items-center">

                      <div>
                        <h3 className="font-bold text-lg">
                          #{index + 1}{" "}
                          {patient.ticketNumber}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {patient.patientName}
                        </p>
                      </div>

                      <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                        Waiting
                      </span>
                    </div>


                    <div className="mt-4 grid grid-cols-2 gap-2">

                      {rooms.map((room) => (
                        <button
                          key={room._id}
                          onClick={() =>
                            assignPatientMutation.mutate({
                              patientId: patient._id,
                              room,
                            })
                          }
                          className="bg-[#006341] hover:bg-[#004d31] transition text-white text-sm py-2 rounded-lg"
                        >
                          Assign {room.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">

              {rooms.map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  Axios={Axios}
                  callNextMutation={callNextMutation}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function RoomCard({
  room,
  Axios,
  callNextMutation,
}) {


  const { data: assignedPatients = [] } = useQuery({
    queryKey: ["roomPatients", room._id],

    queryFn: async () => {
      const res = await Axios.get(
        `/appointments/room/${room._id}`
      );

      return res.data;
    },
  });

  
  const currentPatient =
    assignedPatients.find(
      (p) => p.status === "in-progress"
    ) || assignedPatients[0];

  return (
    <div className="bg-white rounded-2xl border shadow overflow-hidden">
      <div className="bg-[#006341] text-white p-5">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {room.name}
            </h2>

            <p className="text-sm opacity-80 mt-1">
              {room.department}
            </p>
          </div>

          <div className="text-right">

            <p className="text-sm opacity-80">
              Assigned
            </p>

            <p className="text-3xl font-bold">
              {assignedPatients.length}
            </p>
          </div>
        </div>
      </div>


      <div className="p-5 border-b">

        <h3 className="font-semibold text-gray-700 mb-4">
          Current Patient
        </h3>

        {currentPatient ? (
          <div className="bg-gray-100 rounded-xl p-5 text-center">

            <h2 className="text-3xl font-bold text-[#006341]">
              {currentPatient.ticketNumber}
            </h2>

            <p className="text-gray-500 mt-2">
              {currentPatient.patientName}
            </p>
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-xl p-8 text-center text-gray-400">
            No Active Patient
          </div>
        )}

        <button
          onClick={() =>
            callNextMutation.mutate(room._id)
          }
          disabled={assignedPatients.length === 0}
          className="w-full mt-5 bg-[#006341] hover:bg-[#004d31] transition text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          🔊 Call Next Patient
        </button>
      </div>

      <div className="p-5">

        <div className="flex items-center justify-between mb-4">

          <h3 className="font-semibold text-gray-700">
            Assigned Patients
          </h3>

          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {assignedPatients.length}
          </span>
        </div>

        <div className="space-y-3 max-h-[350px] overflow-auto">

          {assignedPatients.length === 0 && (
            <div className="text-center border-2 border-dashed rounded-xl p-6 text-gray-400">
              No Assigned Patients
            </div>
          )}

          {assignedPatients.map((patient, index) => (
            <div
              key={patient._id}
              className="flex items-center justify-between border rounded-xl p-3 bg-gray-50"
            >

              <div>
                <h4 className="font-bold">
                  #{index + 1}{" "}
                  {patient.ticketNumber}
                </h4>

                <p className="text-sm text-gray-500">
                  {patient.patientName}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  patient.status ===
                  "in-progress"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {patient.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}