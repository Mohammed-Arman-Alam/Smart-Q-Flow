import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';

const CentralDesk = () => {

    const Axios = useAxios();

    const [ticket, setTicket] = useState('');
    const [patient, setPatient] = useState(null);
    const [assignedRoom, setAssignedRoom] = useState(null);

    const handleSearch = async () => {

        const res = await Axios.get(
            `/appointment/${ticket}`
        );

        setPatient(res.data);
        setAssignedRoom(null);
    };

    const handleAssign = async () => {

        const res = await Axios.patch(
            `/appointments/auto-assign/${patient._id}`
        );

        setAssignedRoom(res.data.room);

        setPatient({
            ...patient,
            status: "assigned"
        });
    };

    return (
        <div className='p-6 max-w-2xl mx-auto'>

            <h1 className="text-3xl font-bold mb-6 text-center text-[#006341]">
                Central Desk
            </h1>

            <div className="mb-4 p-6 bg-[#00634115] rounded-xl shadow-xl">

                <h2 className='text-lg font-medium pb-2'>
                    Enter Ticket Number
                </h2>

                <div className='flex gap-2'>

                    <input
                        className="border p-2 w-full rounded-lg"
                        placeholder="Enter Ticket Number"
                        value={ticket}
                        onChange={(e) =>
                            setTicket(e.target.value)
                        }
                    />

                    <button
                        className="bg-[#006341] px-4 rounded-lg font-semibold text-white"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            {patient && (

                <div className="border p-5 mb-4 rounded-xl bg-white shadow">

                    <h3 className='text-center text-xl font-semibold mb-3'>
                        Patient Info
                    </h3>

                    <p>
                        <b>Name:</b> {patient.patientName}
                    </p>

                    <p>
                        <b>Department:</b> {patient.department}
                    </p>

                    <p>
                        <b>Status:</b> {patient.status}
                    </p>

                    {patient.status === "waiting" && (

                        <button
                            className="mt-4 w-full bg-[#006341] text-white py-2 rounded-xl"
                            onClick={handleAssign}
                        >
                            Auto Assign Room
                        </button>
                    )}

                    {assignedRoom && (

                        <div className='mt-5 bg-green-50 border border-green-200 p-4 rounded-xl text-center'>

                            <p className='text-sm text-green-700'>
                                Assigned Room
                            </p>

                            <h2 className='text-3xl font-bold text-[#006341] mt-2'>
                                {assignedRoom.name}
                            </h2>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CentralDesk;