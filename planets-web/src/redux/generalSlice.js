import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  CONQUEROR_NAME: ''
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setConquerorName: (state, action) => {
      state.CONQUEROR_NAME = action.payload
    }
  }
})

export const {
  setConquerorName
} = generalSlice.actions
export default generalSlice.reducer
