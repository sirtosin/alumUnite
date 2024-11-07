import { userTableType } from "@/typings";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface UserState {
  userTable: userTableType [];
}

const initialState: UserState = {
  userTable:[],
};

export const addUserTable = createAsyncThunk(
  "user/table",
  (payload, thunkAPI) => {
    try {
      return payload;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const userTableSlice = createSlice({
  name: "userTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserTable.fulfilled, (state: UserState, action: any) => {
        state.userTable = action.payload;

      })
      .addCase(addUserTable.rejected, (state: UserState, action) => {
        state.userTable = [];
      });
  },
});

export default userTableSlice.reducer;
