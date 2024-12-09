import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {add,remove} from '../features/counter/noteSlice'
import toast from 'react-hot-toast';


const NewNote = () => {
  const dispatch=useDispatch();
  const {note}=useSelector((state)=>state);
  console.log(note);

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
    function submitHandler(event) {
      if(formData.name==="" || formData.content===""){
        // event.preventDefault();
        // toast.error("Fill all required fields");
        // console.log("aa gaya if me")
      }
      else{
        dispatch(add(formData));
        event.preventDefault();
        toast.success("Note added successfully");
        console.log(note);
      }
    }
  return (
    <div>
        <form className='flex justify-center flex-col'>
            <label for="name">Note name</label>
            <input className='border-2' id="name" name="name" onChange={changeHandler} value={formData.name} required/>
            <br></br>
            <label for="content">Note</label>
            <textarea className='border-2' id="content" name="content" onChange={changeHandler} value={formData.content} rows="5" cols="50" style={{ width: 'auto' }} required/>
            <br></br>
            <button className='border-2 bg-green-500 rounded-b-lg py-2' onClick={submitHandler}>Add Note</button>
        </form>
    </div>
  )
}

export default NewNote