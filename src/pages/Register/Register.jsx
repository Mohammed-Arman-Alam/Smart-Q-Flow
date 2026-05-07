import React, { useState, useContext, use } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';

const Register = () => {
    const {registerUser} = use(AuthContext);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password, name, url } = Object.fromEntries(formData.entries());

        
        registerUser(email, password)
            .then(async () => {

                Swal.fire({
                    title: "Registration Successful!",
                    icon: "success",
                });

                setErrorMessage("");
            })
            .catch((error) => {
                setErrorMessage(error.message);

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong",
                });
            });
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-5">
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                        <span>Welcome to</span><br />
                         <span className="text-[#006341]"> Smart Q Flow</span>
                    </h1>

                    <p className="mt-4 text-gray-500 hidden sm:block">
                    </p>
                </div>
                <div className="flex-1">
                    <div className="bg-[#00634120] shadow-xl rounded-2xl p-6 sm:p-8">

                        <form onSubmit={handleRegister} className="space-y-4">

                            <div>
                                <label className="block font-semibold mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Profile Picture</label>
                                <input
                                    type="text"
                                    name="url"
                                    placeholder="Photo URL"
                                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#006341] hover:bg-white text-white hover:text-[#006341] font-semibold py-2 rounded-xl transition border border-[#006341]"
                            >
                                Sign Up
                            </button>
                        </form>
                        <p className="text-center mt-4 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-green-700 font-semibold">
                                Login
                            </Link>
                        </p>
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-3 text-center">
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;