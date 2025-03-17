import {createSlice} from "@reduxjs/toolkit";


const loadSellerFromLocalStorage=()=>{
    try {
        const serializedState = localStorage.getItem('seller');
        if(serializedState == null) return {seller:null};
        return {seller:JSON.parse(serializedState)}
    } catch (error) {
        console.error("Error loading seller from localStorage:", error);
        return {seller:null};
    }
}
const initialState = loadSellerFromLocalStorage();

const sellerauthSlice= createSlice({
    name:'sellerauth',
    initialState,
    reducers:{
        setSeller:(state,action)=>{
            state.seller = action.payload;
            localStorage.setItem('seller',JSON.stringify(state.seller))
        },
        logout:(state)=>{
            state.seller = null;
            localStorage.removeItem('seller');
        }
    }
})

export const {setSeller,logout} =sellerauthSlice.actions;
export default sellerauthSlice.reducer;