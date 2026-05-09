import {
  useQuery,
} from "@tanstack/react-query";

import { useState } from "react";
import useAxios from "../../hooks/useAxios";

export default function DoctorManager() {

  const Axios = useAxios();

  const [department, setDepartment] =
    useState("");

  const {
    data: rooms = [],
  } = useQuery({
    queryKey: ["rooms", department],

    enabled: !!department,

    queryFn: async () => {

      const res = await Axios.get(
        `/rooms/${department}`
      );

      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-[#006341]">
              Doctor Queue Manager
            </h1>

            <p className="text-gray-500 mt-2">
              Monitor room queues
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
              Select a department
            </p>
          </div>
        )}

        {department && (

          <div className="grid md:grid-cols-2 gap-6">

            {rooms.map((room) => (

              <RoomCard
                key={room._id}
                room={room}
                Axios={Axios}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RoomCard({
  room,
  Axios,
}) {

  const {
    data: assignedPatients = [],
  } = useQuery({
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
    );

  return (
    <div className="bg-white rounded-2xl border shadow overflow-hidden">

      <div className="bg-[#006341] text-white p-5">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              {room.name}
            </h2>

            <p className="text-sm opacity-80">
              {room.department}
            </p>
          </div>

          <div className="text-right">

            <p className="text-sm">
              Queue
            </p>

            <h2 className="text-3xl font-bold">
              {assignedPatients.length}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-5 border-b">

        <h3 className="font-semibold mb-4">
          Current Patient
        </h3>

        {currentPatient ? (

          <div className="bg-gray-100 rounded-xl p-5 text-center">

            <h2 className="text-4xl font-bold text-[#006341]">
              {currentPatient.ticketNumber}
            </h2>

            <p className="mt-2 text-gray-500">
              {currentPatient.patientName}
            </p>
          </div>

        ) : (

          <div className="border-2 border-dashed rounded-xl p-8 text-center text-gray-400">

            No Active Patient
          </div>
        )}
      </div>

      <div className="p-5">

        <h3 className="font-semibold mb-4">
          Waiting Queue
        </h3>

        <div className="space-y-3">

          {assignedPatients
            .filter(
              (p) =>
                p.status === "assigned"
            )
            .map((patient, index) => (

              <div
                key={patient._id}
                className="border rounded-xl p-3 bg-gray-50 flex justify-between"
              >

                <div>

                  <h4 className="font-bold">
                    #{index + 1}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {patient.patientName}
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-[#006341]">

                  {patient.ticketNumber}
                </h2>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}