import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';

const CentralDesk = () => {
    const Axios = useAxios();
    const [ticket, setTicket] = useState('');
    const [patient, setPatient] = useState(null);

    return (
        <div className='p-6 max-w-2xl mx-auto'>
            
            <h1 className="text-3xl font-bold mb-6 text-center">
                Central Desk - Payment Verification
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
                        onChange={(e) => setTicket(e.target.value)}
                    />

                    <button
                        className="bg-[#006341] px-4 rounded-lg font-semibold text-white"
                        onClick={async () => {
                            const res = await Axios.get(
                                `/appointment/${ticket}`
                            );
                            setPatient(res.data);
                        }}
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

                    <p><b>Name:</b> {patient.name}</p>
                    <p><b>Department:</b> {patient.department}</p>
                    <p><b>Status:</b> {patient.status}</p>

                    {patient.status === "waiting" && (
                        <button
                            className="mt-4 w-full bg-[#006341] text-white py-2 rounded-xl"
                            onClick={async () => {
                                await Axios.patch(
                                    `/appointments/mark-ready/${patient._id}`
                                );

                                alert("Payment Verified → Patient Ready");
                                setPatient({
                                    ...patient,
                                    status: "paid"
                                });
                            }}
                        >
                            Mark as Ready (Payment Done)
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CentralDesk;