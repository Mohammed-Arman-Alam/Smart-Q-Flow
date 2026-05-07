import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export default function PublicDisplay() {
  const Axios = useAxios();

  
  const { data: rooms = [] } = useQuery({
    queryKey: ["allRooms"],
    queryFn: async () => {
      const res = await Axios.get("/rooms");
      return res.data;
    },
    refetchInterval: 5000, 
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-[#006341]">
          🏥 Live Hospital Room Status
        </h1>
        <p className="text-gray-500">
          All departments & rooms in real-time
        </p>
      </div>

    
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} Axios={Axios} />
        ))}

      </div>
    </div>
  );
}

function RoomCard({ room, Axios }) {

  const { data: patients = [] } = useQuery({
    queryKey: ["roomLive", room._id],
    queryFn: async () => {
      const res = await Axios.get(
        `/appointments/room/${room._id}`
      );
      return res.data;
    },
    refetchInterval: 3000,
  });

  const current = patients.find(
    (p) => p.status === "in-progress"
  );

  const next = patients.find(
    (p) => p.status === "assigned"
  );

  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">

    
      <div className="bg-[#006341] text-white p-4">
        <h2 className="text-xl font-bold">{room.name}</h2>
        <p className="text-sm opacity-80">
          {room.department}
        </p>
      </div>

      
      <div className="p-5 space-y-4">

        
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Current Patient
          </p>

          <h2 className="text-3xl font-bold text-[#006341]">
            {current ? current.ticketNumber : "—"}
          </h2>

          <p className="text-gray-700">
            {current ? current.patientName : "No active patient"}
          </p>
        </div>

        
        <div className="bg-gray-50 rounded-xl p-4 border">
          <p className="text-sm text-gray-500">
            Next Patient
          </p>

          <h2 className="text-2xl font-bold">
            {next ? next.ticketNumber : "—"}
          </h2>

          <p className="text-gray-600">
            {next ? next.patientName : "No waiting patient"}
          </p>
        </div>

        <div className="text-center">
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              current
                ? "bg-green-100 text-green-700"
                : next
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {current
              ? "IN CONSULTATION"
              : next
              ? "READY"
              : "EMPTY"}
          </span>
        </div>

      </div>
    </div>
  );
}