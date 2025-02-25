import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { log } from '../features/counter/logInSlice';
import { useDispatch, useSelector } from 'react-redux';
import {apiConnector} from '../services/apiConnector'
import { setToken } from "../features/counter/userSlice";
import { useNavigate } from "react-router-dom";
import {setNotes} from "../features/counter/noteSlice"

const LogIn = () => {
    // const BASE_URL = 'https://notex-backend-k1fy.onrender.com';
    const BASE_URL=process.env.REACT_APP_BASE_URL;
    const navigate=useNavigate();

    const dispatch = useDispatch();
    // const selector=useSelector();
    const {token} = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await apiConnector("POST", `${BASE_URL}/api/v1/log-in`, formData)
            console.log(response);
            const notes=response.data.existing.notes;
            console.log(notes);
            dispatch(setToken(response.data.token));
            // dispatch(setNotes(notes));
            localStorage.setItem("token", JSON.stringify(response.data.token))
            toast.success(response.data.message || "Login successful!");
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-black/[.6] rounded-b-lg text-white p-1 w-[300px] md:w-[430px]">
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-2 text-center">Log In</h2>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LogIn;
