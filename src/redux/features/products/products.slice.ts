import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../types/types";



const initialState: TProduct[] = []

export const authslice = createSlice({
  name: "products",
  initialState,
  reducers: {
    


  },
});

export const {  } = authslice.actions;
export default authslice.reducer;
