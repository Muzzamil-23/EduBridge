import { create } from "zustand";
import authService from "../supabase/authService";
import profileService from "../supabase/profileService";


export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  error: null,
  isProfileCompleted: false,

  // Create new account
  createAccount: async ({ email, password }) => {
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
  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login({ email, password });
      set({ user: data.user || null });
      await get().fetchUserProfile()
      set({ loading: false })
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      // 1️⃣ Get current session user
      const user = await authService.getCurrentUser();

      if (user) {
        set({ user });
        await get().fetchUserProfile();
      } else {
        set({ user: null });
      }

      // 2️⃣ Subscribe to auth state changes
      const { data: subscription } = authService.client.auth.onAuthStateChange(
        async (event, session) => {
          // console.log("Auth change event:", event);
          if (session?.user) {
            set({ user: session.user });
            await get().fetchUserProfile();
          } else {
            set({ user: null, profile: null, isProfileCompleted: false });
          }
        }
      );

      // 3️⃣ Optional cleanup (useful for dev hot reload)
      return () => subscription.subscription.unsubscribe();
    } catch (err) {
      console.error("fetchUser error:", err.message);
      set({ error: err.message, user: null });
    } finally {
      set({ loading: false });
    }
  },


  // Fetch user profile (personal + academic)
  fetchUserProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const [personal, academic] = await Promise.all([
        profileService.getPersonalData(user.id),
        profileService.getAcademicData(user.id),
      ]);

      const isComplete = !!(personal && academic);
      set({
        profile: { personal, academic },
        isProfileCompleted: isComplete,
      });
      return { personal, academic };
    } catch (err) {
      console.error("Profile fetch error:", err.message);
      set({ profile: null, isProfileCompleted: false });
    }
  },

  // Logout
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
      set({ user: null, profile: null, isProfileCompleted: false, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));



