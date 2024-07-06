import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  },
  reducers: {
    updateForm: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },
    resetForm: (state) => {
      state.firstName = ''
      state.lastName = ''
      state.email = ''
      state.subject = ''
      state.message = ''
    },
  },
})

export const { updateForm, resetForm } = formSlice.actions
export default formSlice.reducer
