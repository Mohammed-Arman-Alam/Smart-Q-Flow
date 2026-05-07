import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function DoctorRoom() {

  const Axios = useAxios();
  const queryClient = useQueryClient();


  const [department, setDepartment] =
    useState("");


  const [room, setRoom] =
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


  const selectedRoom = rooms.find(
    (r) => r._id === room
  );

  const {
    data: assignedPatients = [],
    isLoading,
  } = useQuery({
    queryKey: ["roomPatients", room],

    enabled: !!room,

    queryFn: async () => {
      const res = await Axios.get(
        `/appointments/room/${room}`
      );

      return res.data;
    },
  });

  const currentPatient =
    assignedPatients.find(
      (p) => p.status === "in-progress"
    ) || null;


  const nextPatient =
    assignedPatients.find(
      (p) => p.status === "assigned"
    ) || null;

  const callNextMutation = useMutation({
    mutationFn: async () => {
      return Axios.patch(
        `/appointments/call-next/${room}`
      );
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


  const completePatientMutation =
    useMutation({
      mutationFn: async (patientId) => {
        return Axios.patch(
          `/appointments/complete/${patientId}`
        );
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
    <div className="min-h-screen bg-gray-50">


      <main className="max-w-7xl mx-auto p-6">

      

        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">

          <div>

            <h2 className="text-4xl font-bold text-[#006341]">
              Doctor Room
            </h2>

            <p className="text-gray-500 mt-2">
              Manage patient consultation
            </p>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-3 flex gap-4 flex-wrap">


            <select
              value={department}
              onChange={(e) => {

                setDepartment(
                  e.target.value
                );

                setRoom("");
              }}
              className="border rounded-xl px-4 py-2"
            >

                <option value="">Select Department</option>
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
            <select
              value={room}
              onChange={(e) =>
                setRoom(
                  e.target.value
                )
              }
              disabled={!department}
              className="border rounded-xl px-4 py-2"
            >

              <option value="">
                Select Room
              </option>

              {rooms.map(
                (roomItem) => (
                  <option
                    key={roomItem._id}
                    value={roomItem._id}
                  >
                    {roomItem.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {!room && (

          <div className="border-2 border-dashed rounded-3xl bg-white p-20 text-center">

            <h2 className="text-3xl font-bold text-[#006341]">
              Select Department & Room
            </h2>

            <p className="text-gray-500 mt-4">
              Choose a room to start consultation
            </p>
          </div>
        )}

        {room && (
          <>


            <div className="grid md:grid-cols-3 gap-6 mb-8">


              <div className="bg-white border rounded-2xl p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Room Status
                </p>

                <div className="flex items-center gap-3 mt-3">

                  <div
                    className={`w-4 h-4 rounded-full ${
                      nextPatient
                        ? "bg-green-500 animate-pulse"
                        : "bg-gray-300"
                    }`}
                  />

                  <h2 className="text-2xl font-bold">

                    {nextPatient
                      ? "Ready"
                      : "Waiting"}
                  </h2>
                </div>
              </div>


              <div className="bg-white border rounded-2xl p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Waiting Patients
                </p>

                <h2 className="text-4xl font-bold text-[#006341] mt-2">

                  {
                    assignedPatients.filter(
                      (p) =>
                        p.status ===
                        "assigned"
                    ).length
                  }
                </h2>
              </div>


              <div className="bg-white border rounded-2xl p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Current Room
                </p>

                <h2 className="text-4xl font-bold text-[#006341] mt-2">

                  {
                    selectedRoom?.name
                  }
                </h2>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

              

              <div className="lg:col-span-7">

                <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">


                  <div className="bg-[#006341] text-white p-6">

                    <h2 className="text-2xl font-bold">
                      Current Patient
                    </h2>

                    <p className="opacity-80 text-sm mt-1">
                      Active consultation
                    </p>
                  </div>

                  <div className="p-8 min-h-[400px] flex flex-col justify-center">

                    {currentPatient ? (

                      <div className="text-center">

                        <p className="text-sm text-gray-500 mb-3">
                          TOKEN NUMBER
                        </p>

                        <h2 className="text-7xl font-black text-[#006341]">

                          {
                            currentPatient.ticketNumber
                          }
                        </h2>

                        <h3 className="text-3xl font-bold mt-6">

                          {
                            currentPatient.patientName
                          }
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mt-10">

                          <div className="bg-gray-100 rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                              Department
                            </p>

                            <h4 className="font-bold mt-1">
                              {department}
                            </h4>
                          </div>

                          <div className="bg-gray-100 rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                              Room
                            </p>

                            <h4 className="font-bold mt-1">

                              {
                                selectedRoom?.name
                              }
                            </h4>
                          </div>
                        </div>


                        <button
                          onClick={() =>
                            completePatientMutation.mutate(
                              currentPatient._id
                            )
                          }
                          className="mt-10 bg-red-500 hover:bg-red-600 transition text-white px-8 py-3 rounded-xl font-semibold"
                        >
                          Complete Consultation
                        </button>
                      </div>

                    ) : (

                      <div className="text-center">

                        <div className="w-28 h-28 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-5xl">

                          👨‍⚕️
                        </div>

                        <h2 className="text-3xl font-bold mt-6 text-gray-700">

                          No Active Patient
                        </h2>

                        <p className="text-gray-500 mt-3">

                          Call next patient to begin
                        </p>

                  

                        <button
                          onClick={() =>
                            callNextMutation.mutate()
                          }
                          disabled={!nextPatient}
                          className="mt-8 bg-[#006341] hover:bg-[#004d31] transition text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50"
                        >
                          🔊 Call Next Patient
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              

              <div className="lg:col-span-5">

                <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

                  <div className="p-6 border-b flex justify-between items-center">

                    <div>

                      <h2 className="text-2xl font-bold text-[#006341]">

                        Up Next
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">

                        Assigned waiting patients
                      </p>
                    </div>

                    <span className="bg-[#006341] text-white px-4 py-2 rounded-full text-sm">

                      {
                        assignedPatients.filter(
                          (p) =>
                            p.status ===
                            "assigned"
                        ).length
                      }{" "}
                      waiting
                    </span>
                  </div>

                

                  <div className="p-5 space-y-4 max-h-[700px] overflow-auto">

                    {assignedPatients
                      .filter(
                        (p) =>
                          p.status ===
                          "assigned"
                      )
                      .length === 0 && (

                      <div className="border-2 border-dashed rounded-2xl p-10 text-center text-gray-400">

                        No waiting patients
                      </div>
                    )}

                    {assignedPatients
                      .filter(
                        (p) =>
                          p.status ===
                          "assigned"
                      )
                      .map(
                        (
                          patient,
                          index
                        ) => (

                          <div
                            key={patient._id}
                            className="border rounded-2xl p-5 bg-gray-50"
                          >

                            <div className="flex justify-between">

                              <div>

                                <p className="text-xs text-gray-500">
                                  SERIAL
                                </p>

                                <h2 className="text-2xl font-bold text-[#006341]">

                                  #{index + 1}
                                </h2>
                              </div>

                              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs h-fit">

                                Waiting
                              </span>
                            </div>

                            <div className="mt-5">

                              <p className="text-sm text-gray-500">
                                Token Number
                              </p>

                              <h3 className="text-3xl font-black mt-1">

                                {
                                  patient.ticketNumber
                                }
                              </h3>

                              <h4 className="text-lg font-semibold mt-3">

                                {
                                  patient.patientName
                                }
                              </h4>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}