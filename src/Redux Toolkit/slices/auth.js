import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Api/Api";
import axios from "axios";
import { showToast } from "../../utilities/showToast";
import Cookies from "js-cookie";
export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API.login, {
        email: values.email,
        password: values.password,
      });
      showToast("success", "user logged in successfully");
      const token = data.token;
      Cookies.set("token", token, { expires: 7 });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Error in login";
      return rejectWithValue(message);
    }
  }
);

export const handleLogout = () => (dispatch) => {
  Cookies.remove("token");
  Cookies.remove("user");
  localStorage.setItem("cart", 0);
  localStorage.setItem("wishlist", 0);
  dispatch(logout());
  showToast("success", "Logged out successfully");
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: Cookies.get("token") ? true : false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
