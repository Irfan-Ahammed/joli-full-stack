import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: []
  },
  reducers: {
    setLocation: (state, action) => {
      state.locations = action.payload;
    }
  }
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
