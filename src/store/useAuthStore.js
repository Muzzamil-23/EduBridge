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
      set({ user: data.user || null});
      await get().fetchUserProfile()
      set({loading: false})
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
      // get current user safely
      const user = await authService.getCurrentUser();
      // console.log("getCurrentUser result:", user);

      if (user) {
        set({ user });
        await get().fetchUserProfile();
      } else {
        // if no user session, keep null
        set({ user: null });
      }
    } catch (err) {
      console.error("fetchUser error:", err.message);
      set({ error: err.message, user: null });
    } finally {
      // ✅ loading should only be false after all async logic completes
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



// import { create } from "zustand";
// import { supabase } from "../supabase/config";
// import authService from "../supabase/authService";
// import profileService from "../supabase/profileService";

// export const useAuthStore = create((set, get) => ({
//   user: null,
//   loading: true,
//   error: null,
//   isProfileComplete: false,
//   profile: null,

//   init: async () => {
//     try {
//       // 1️⃣ Check existing session first
//       const { data: { session } } = await supabase.auth.getSession();
//       const user = session?.user || null;

//       if (user) {
//         set({ user });
//         await get().fetchUserProfile();
//       } else {
//         set({ user: null });
//       }

//       // 2️⃣ Subscribe to auth state changes (login, logout, refresh)
//       supabase.auth.onAuthStateChange(async (_event, session) => {
//         if (session?.user) {
//           set({ user: session.user });
//           await get().fetchUserProfile();
//         } else {
//           set({ user: null, profile: null, isProfileComplete: false });
//         }
//       });
//     } catch (err) {
//       console.error("Auth init error:", err.message);
//       set({ error: err.message });
//     } finally {
//       // ✅ Done hydrating
//       set({ loading: false });
//     }
//   },

//   fetchUserProfile: async () => {
//     const { user } = get();
//     if (!user) return;

//     try {
//       const [personal, academic] = await Promise.all([
//         profileService.getPersonalData(user.id),
//         profileService.getAcademicData(user.id),
//       ]);

//       const isComplete = !!(personal && academic);
//       set({
//         profile: { personal, academic },
//         isProfileComplete: isComplete,
//       });
//     } catch (err) {
//       console.error("Profile fetch error:", err.message);
//       set({ profile: null, isProfileComplete: false });
//     }
//   },
// }));


