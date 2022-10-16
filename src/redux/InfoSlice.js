
import {createSlice} from "@reduxjs/toolkit";
 export const InfoSlice = createSlice({

    name:'counter',
    initialState:{
        objAll:{ amount:false, userlogged:{},
    }},
    reducers:{
        change:(state)=>{
            state.objAll.amount= !state.objAll.amount
        },
        userlog:(state,user)=>{
            state.objAll.userlogged=user.payload
        }
    },  
    
 })
 export const {change,userlog} = InfoSlice.actions

 export const selectAll = (state)=>state.info.objAll
 export default InfoSlice.reducer