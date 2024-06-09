import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

export const loginModal = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const { setShowModal } = loginModal.actions;

export default loginModal.reducer;
