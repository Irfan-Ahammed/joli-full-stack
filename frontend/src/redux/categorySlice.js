import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Async thunk to fetch categories from the backend
export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
  const response = await fetch(CATEGORY_API_END_POINT);
  const data = await response.json();
  return data;
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
