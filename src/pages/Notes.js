import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {add,remove} from '../features/counter/noteSlice'
import {update} from '../features/counter/userSlice'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Notes = () => {   
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state);
    const note=user.notes||[];
    console.log(user);
    const BASE_URL='https://notex-backend-0j9r.onrender.com/';


    return(
        note.length===0?<div className='bg-black/[.6] rounded-b-lg text-white p-1 text-center'>No Note added</div>:
        <div className='flex flex-col bg-black/[.6] rounded-b-lg text-white'>            
            {note.map((noteItem,itemNo)=>(
                <div
                    className={itemNo+1!==note.length?'border-b-2 flex gap-2 py-2 p-6':'flex gap-2 py-2 p-6'}>
                    <div>
                        <div className='text-lg	'>{itemNo+1}.</div>                        
                    </div>
                    <div>
                        <div className=' font-bold text-xl'>{noteItem.name}</div>
                        <div>{noteItem.content}</div>
                        <button className='bg-red-600 p-1 rounded-lg' onClick={async (event)=>{
                            event.preventDefault();
                            try{
                                const id=noteItem._id;
                                const response=await axios.delete(`${BASE_URL}/api/v1/delete-note/${id}`,{
                                    withCredentials: true,
                                  });
                                dispatch(update(response));
                                toast.success("Note removed");
                            }catch(error){
                                toast.error(error.response?.data?.message)
                            }
                            
                        }}>Delete Note</button>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

export default Notes