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

    async getUniversityWithPrograms(id) {
        const { data, error } = await this.client
            .from("universities")
            .select(`
        *,
        programs (
        *,
        university_program_features (*)
        )
      `)
            .eq("uni_id", id)
            .single()

        if (error) throw error
        return data
    }
}

const universityService = new UniversityService()
export default universityService
