// import { supabase } from "./config";

// export class ProfileService {
//   constructor() {
//     this.client = supabase;
//   }

//   // ✅ Check if user has completed both personal + academic data
//   async isProfileCompleted(userId) {
//     try {
//       const [personal, academic] = await Promise.all([
//         this.client
//           .from("student_personal_data")
//           .select("id")
//           .eq("user_id", userId)
//           .maybeSingle(),
//         this.client
//           .from("student_academic_data")
//           .select("id")
//           .eq("user_id", userId)
//           .maybeSingle(),
//       ]);

//       const hasPersonal = !!personal.data;
//       const hasAcademic = !!academic.data;

//       return hasPersonal && hasAcademic;
//     } catch (err) {
//       console.error("Error checking profile completion:", err.message);
//       return false;
//     }
//   }

//   // ✅ Fetch individual profile parts
//   async getPersonalData(userId) {
//     const { data, error } = await this.client
//       .from("student_personal_data")
//       .select("*")
//       .eq("user_id", userId)
//       .maybeSingle();
//     if (error) throw error;
//     return data;
//   }

//   async getAcademicData(userId) {
//     const { data, error } = await this.client
//       .from("student_academic_data")
//       .select("*")
//       .eq("user_id", userId)
//       .maybeSingle();
//     if (error) throw error;
//     return data;
//   }

//   // ✅ Insert personal info
//   async createPersonalData(payload) {
//     // ADD THIS: Check the session
//     const { data: { session } } = await this.client.auth.getSession();
//     console.log("Session exists?", !!session);
//     console.log("Session user id:", session?.user?.id);
//     console.log("Payload user_id:", payload.user_id);
//     console.log("Match?", session?.user?.id === payload.user_id);
//     const { data, error } = await this.client
//       .from("student_personal_data")
//       .insert(payload)
//       .select()
//       .single();
//     if (error) throw error;
//     return data;
//   }

//   // ✅ Insert academic info
//   async createAcademicData(payload) {
//     const { data, error } = await this.client
//       .from("student_academic_data")
//       .insert(payload)
//       .select()
//       .single();
//     if (error) throw error;
//     return data;
//   }
// }

// const profileService = new ProfileService()
// export default profileService


// 222222222222

// import { supabase } from "./config";

// export class ProfileService {
//   constructor() {
//     this.client = supabase;
//   }

//   // ✅ Check if user has completed both personal + academic data
//   async isProfileCompleted(userId) {
//     try {
//       const [personal, academic] = await Promise.all([
//         this.client
//           .from("student_personal_data")
//           .select("id")
//           .eq("user_id", userId)
//           .maybeSingle(),
//         this.client
//           .from("student_academic_data")
//           .select("id")
//           .eq("user_id", userId)
//           .maybeSingle(),
//       ]);

//       const hasPersonal = !!personal.data;
//       const hasAcademic = !!academic.data;

//       return hasPersonal && hasAcademic;
//     } catch (err) {
//       console.error("Error checking profile completion:", err.message);
//       return false;
//     }
//   }

//   // ✅ Fetch personal data
//   async getPersonalData(userId) {
//     const { data, error } = await this.client
//       .from("student_personal_data")
//       .select("*")
//       .eq("user_id", userId)
//       .maybeSingle();
//     if (error) throw error;
//     return data;
//   }

//   // ✅ Fetch academic data
//   async getAcademicData(userId) {
//     const { data, error } = await this.client
//       .from("student_academic_data")
//       .select("*")
//       .eq("user_id", userId)
//       .maybeSingle();
//     if (error) throw error;
//     return data;
//   }

//   // ✅ Upsert personal data (insert or update)
//   async createPersonalData(payload) {
//     const { data: { session } } = await this.client.auth.getSession();
//     if (!session?.user?.id) throw new Error("No active user session found.");

//     console.log("Upserting personal data for:", payload.user_id);

//     const { data, error } = await this.client
//       .from("student_personal_data")
//       .upsert(payload, { onConflict: "user_id" }) // 👈 Important: prevent duplicates
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   }

//   // ✅ Upsert academic data (insert or update)
//   async createAcademicData(payload) {
//     console.log("Upserting academic data for:", payload.user_id);

//     const { data, error } = await this.client
//       .from("student_academic_data")
//       .upsert(payload, { onConflict: "user_id" }) // 👈 same here
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   }
// }

// const profileService = new ProfileService();
// export default profileService;



// 33 (maybe final)


import { supabase } from "./config";

export class ProfileService {
  constructor() {
    this.client = supabase;
  }

  // ✅ Check if user completed both sections
  async isProfileCompleted(userId) {
    try {
      const [personal, academic] = await Promise.all([
        this.client
          .from("student_personal_data")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle(),
        this.client
          .from("student_academic_data")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle(),
      ]);

      return Boolean(personal.data && academic.data);
    } catch (err) {
      console.error("❌ Error checking profile completion:", err.message);
      return false;
    }
  }

  // ✅ Fetch personal data
  async getPersonalData(userId) {
    const { data, error } = await this.client
      .from("student_personal_data")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw new Error(`Failed to fetch personal data: ${error.message}`);
    return data;
  }

  // ✅ Fetch academic data
  async getAcademicData(userId) {
    const { data, error } = await this.client
      .from("student_academic_data")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw new Error(`Failed to fetch academic data: ${error.message}`);
    return data;
  }

  // ✅ Upsert personal data
  async upsertPersonalData(payload) {
    const {
      data: { session },
      error: sessionError,
    } = await this.client.auth.getSession();

    if (sessionError) throw new Error("Failed to retrieve user session");
    if (!session?.user?.id) throw new Error("No active user session found.");

    const { data, error } = await this.client
      .from("student_personal_data")
      .upsert(payload, { onConflict: "user_id" })
      .select()
      .single();

    if (error) throw new Error(`Failed to save personal data: ${error.message}`);
    return data;
  }

  // ✅ Upsert academic data
  async upsertAcademicData(payload) {
    const { data, error } = await this.client
      .from("student_academic_data")
      .upsert(payload, { onConflict: "user_id" })
      .select()
      .single();

    if (error) throw new Error(`Failed to save academic data: ${error.message}`);
    return data;
  }
}

const profileService = new ProfileService();
export default profileService;


