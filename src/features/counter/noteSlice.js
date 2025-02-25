import { createSlice } from '@reduxjs/toolkit'
import { apiConnector } from '../../services/apiConnector';

 // fetch all notes of user
  // const fetchData=async()=>{
  //   try{
  //       const response = await apiConnector("GET", `${BASE_URL}/api/v1/fetch-note`)
        
  //       dispatch(update(response.data.data));
  //   }catch(error){
  //       console.error(error.response?.data?.message)
  //   }
  // }
  // useEffect(() => {
  //     fetchData();
  // }, [useLocation().pathname,user]); 

export const noteSlice = createSlice({
  name: 'note',
  initialState:[],
  reducers: {
    setNotes:(state,action)=>{
      return action.payload;
    },
    add:(state,action)=>{
      state.push(action.payload);
    },
    remove:(state,action)=>{
      state.splice(action.payload,1);
    }
  },
})

// Action creators are generated for each case reducer function
export const { add,remove,setNotes } = noteSlice.actions

export default noteSlice.reducer