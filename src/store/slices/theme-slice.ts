import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

type ThemeState = {
  darkMode: boolean;
};

const initialState: ThemeState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const {toggleTheme, setTheme} = themeSlice.actions;
export default themeSlice.reducer;
