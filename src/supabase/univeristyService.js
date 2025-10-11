import { supabase } from "./config"

export class UniversityService {
    client
    constructor() {
        this.client = supabase
    }

    async getAllUniversities() {
        const { data, error } = await this.client
            .from('universities')
            .select('*')
        if (error) throw error
        return data
    }

    async getUniversityById(id) {
        const { data, error } = await this.client
            .from('universities')
            .select('*')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    }
}

const universityService = new UniversityService()
export default universityService
