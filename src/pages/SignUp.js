// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// // import dotenv from 'dotenv';
// // dotenv.config();

// const SignUp = () => {
//     // const BASE_URL=process.env.BASE_URL;
//     const BASE_URL='http://localhost:3000';
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//     });

//     const handleChange = (event) => {
//         setFormData({ ...formData, [event.target.name]: event.target.value });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post(`${BASE_URL}/api/v1/sign-up`, formData,{
//                 withCredentials: true,
//               });
//             toast.success(response.data.message || "Signup successful!");
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Signup failed!");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Sign Up</h2>
//             <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//             />
//             <button type="submit">Sign Up</button>
//         </form>
//     );
// };

// export default SignUp;

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
    const BASE_URL='https://notex-backend-k1fy.onrender.com';
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword:""
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(formData.password!==formData.confirmPassword){
                toast.error("Password and Confirm password donot match")
                return ;
            }
            const response = await axios.post(`${BASE_URL}/api/v1/sign-up`, formData, {
                withCredentials: true,
            });
            toast.success(response.data.message || "Signup successful!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <div className="flex justify-center items-center bg-black/[.6] rounded-b-lg text-white p-1">
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <div className="mb-4">
                    <label 
                    className="block mb-1 font-medium" 
                    htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="password">Confirm password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
