import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {add,remove, setNotes} from '../features/counter/noteSlice'
import {update} from '../features/counter/userSlice'
import toast from 'react-hot-toast';
import axios from 'axios';
import {apiConnector} from '../services/apiConnector'



const NewNote = () => {
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state);
  // const BASE_URL='https://notex-backend-k1fy.onrender.com';
  const BASE_URL=process.env.REACT_APP_BASE_URL;
 const {token}=useSelector((state)=>state.user)

  const [formData,setFormData]=useState({name:"",content:"",})
    function changeHandler(event) {
        const {name,value}=event.target;
        setFormData(prevData=>{
            return{
                ...prevData,
                [name]:value
            }
        })
    }
    async function submitHandler(event) {
      if(formData.name==="" || formData.content===""){
        // event.preventDefault();
        // toast.error("Fill all required fields");
      }
      else{
        event.preventDefault();
        try{
          const {name,content}=formData;
          const response = await apiConnector("POST", `${BASE_URL}/api/v1/add-note`,{
            name,
            content,
            // token
            
          })
          toast.success(response.data.message || 'Note added successfully');
          // console.log(response);
          const userProfile=response.data.data;
          // console.log(userProfile);
          dispatch(setNotes(userProfile.notes));
        }catch(error){
          toast.error(error.response?.data?.message || "Note was not added due to some error")
        }
      }
    }
  return (
    <div>
        <form className='bg-black/[.6] flex justify-center flex-col p-6 rounded-b-sm shadow-md w-full text-white'>         
          <label className="block mb-1 font-medium" for="name">Note name</label>
          <input className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
 placeholder="Note name" id="name" name="name" onChange={changeHandler} value={formData.name} required/>
          <br></br>
          <label className="block mb-1 font-medium" for="content">Note</label>
          <textarea className="text-black border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
 placeholder="Note content" id="content" name="content" onChange={changeHandler} value={formData.content} rows="5" cols="50" style={{ width: 'auto' }} required/>
          <br></br>
          <button className='text-black border-2 bg-green-500 rounded-lg py-2' onClick={submitHandler}>Add Note</button>
        </form>
    </div>
  )
}

export default NewNote