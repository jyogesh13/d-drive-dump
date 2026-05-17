import { createSlice } from "@reduxjs/toolkit";

export const modeChangeSlice = createSlice({
  name: "modeChange",
  initialState: {
    darkMode: true,
    lightMode: false,
  },
  reducers: {
    darkModeToggle: (state) => {
      state.darkMode = true;
      state.lightMode = false;
    },
    lightModeToggle: (state) => {
      state.lightMode = true;
      state.darkMode = false;
    },
  },
});

export const { darkModeToggle, lightModeToggle } = modeChangeSlice.actions;

export default modeChangeSlice.reducer;
