import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobType: "",
  salaryMin: "",
  salaryMax: "",
  location: "",
  remote: false
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state[action.payload.key] = action.payload.value;
    }
  }
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
