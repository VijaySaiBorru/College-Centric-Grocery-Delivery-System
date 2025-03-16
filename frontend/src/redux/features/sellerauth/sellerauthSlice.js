import {createSlice} from "@reduxjs/toolkit";


const loadUserFromLocalStorage=()=>{
    try {
        const serializedState = localStorage.getItem('seller');
        if(serializedState == null) return {seller:null};
        return {seller:JSON.parse(serializedState)}
    } catch (error) {
        return {seller:null};
    }
}
const initialState = loadUserFromLocalStorage();

const sellerauthSlice= createSlice({
    name:'sellerauth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload.user;
            localStorage.setItem('seller',JSON.stringify(state.seller))
        },
        logout:(state)=>{
            state.user = null;
            localStorage.removeItem('seller');
        }
    }
})

export const {setUser,logout} =sellerauthSlice.actions;
export default sellerauthSlice.reducer;