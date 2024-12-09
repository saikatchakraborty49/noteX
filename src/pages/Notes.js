import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {add,remove} from '../features/counter/noteSlice'
import toast from 'react-hot-toast'

const Notes = () => {
    const {note}=useSelector((state)=>state);
    const dispatch=useDispatch();
    function deleteHandler(event) {
        event.preventDefault();
        console.log('ji');
        dispatch(remove(event.itemNo));
    }
    // const itemNo=1;
    return(
        // <div className='flex flex-col'>
        //     {note.map((noteItem,itemNo)=>(
        //         <div>
        //             <div className='flex gap-2'>
        //                 <div>{itemNo+1}.</div>
        //                 <div>{noteItem.name}</div>
        //             </div>
        //             <div>{noteItem.content}</div>
        //             <button className='bg-red-600' onClick={(event)=>{
        //                 event.preventDefault();
        //                 dispatch(remove(itemNo));
        //                 toast.error("Note removed")
        //             }}>Delete Note</button>
        //         </div>
        //     ))}
        // </div>
        note.length==0?<div className='bg-black/[.6] rounded-b-lg text-white p-1 text-center'>No Note added</div>:
        <div className='flex flex-col bg-black/[.6] rounded-b-lg text-white'>            
            {note.map((noteItem,itemNo)=>(
                <div
                    className={itemNo+1!=note.length?'border-b-2 flex gap-2 py-2':'flex gap-2 py-2'}>
                    <div>
                        <div className='text-lg	'>{itemNo+1}.</div>                        
                    </div>
                    <div>
                        <div className=' font-bold text-xl'>{noteItem.name}</div>
                        <div>{noteItem.content}</div>
                        <button className='bg-red-600 p-1 rounded-lg' onClick={(event)=>{
                            event.preventDefault();
                            dispatch(remove(itemNo));
                            toast.error("Note removed")
                        }}>Delete Note</button>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

export default Notes