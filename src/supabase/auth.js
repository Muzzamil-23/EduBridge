import { supabase } from "./config";

export class AuthService {
    client
    constructor() {
        this.client = supabase
    }

    async createAccount({ email, password }) {
        try {
            let { data, error } = await this.client.auth.signUp({ email, password })
            if (data?.session) {
                return data
            } else if (error) {
                throw error
            } else return data
        } catch (error) {
            console.log("AuthService :: createAccount :: error", error);
            throw error
        }
    }

    async login({ email, password }) {
        try {
            let { data, error } = await this.client.auth.signInWithPassword({ email, password })
            if (data) return data
            else if (error) throw error
        } catch (error) {
            console.log("AuthService :: login :: error", error);
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const { data: { user }, error } = await this.client.auth.getUser()
            if(user) return user
        } catch (error) {
            console.log("AuthService :: getCurrentUser :: error", error);
            throw error
        }
    }

    async logout() {
        try {
            let { error } = await this.client.auth.signOut()
            if (error) throw error

        } catch (error) {
            console.log("AuthService :: getCurrentUser :: error", error);
            throw error
        }
    }

}

const authService = new AuthService()

export default authService
