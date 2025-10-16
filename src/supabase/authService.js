import { supabase } from "./config";

export class AuthService {
    client
    constructor() {
        this.client = supabase
    }

    // Signup
    async createAccount({ email, password }) {
        try {
            let { data, error } = await this.client.auth.signUp({ email, password })
            if(error) throw error
            return data
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error.message);
            throw error
        }
    }

    // login
    async login({ email, password }) {
        try {
            let { data, error } = await this.client.auth.signInWithPassword({ email, password })
            if(error) throw error
            return data
        } catch (error) {
            console.error("AuthService :: login :: error", error.message);
            throw error
        }
    }

    // get current user session
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await this.client.auth.getUser()
            if(error) throw error
            return user || null
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error.message);
            throw error
        }
    }

    async logout() {
        try {
            const { error } = await this.client.auth.signOut()
            if (error) throw error
            return true
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error.message);
            throw error
        }
    }

}

const authService = new AuthService()

export default authService
