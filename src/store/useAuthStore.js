import { create } from "zustand";
import authService from "../supabase/authService";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Create new account
  createAccount: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.createAccount({ email, password });
      set({ user: data.user || null, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login({ email, password });
      set({ user: data.user || null, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Fetch current user (on refresh or app start)
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const user = await authService.getCurrentUser();
      set({ user, loading: false });
      return user;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Logout
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
      set({ user: null, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
