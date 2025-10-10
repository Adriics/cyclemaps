// src/services/userService.ts
import { supabase } from "../config/supabaseClient"

export class UserService {
  async create(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // se guarda en user_metadata
      },
    })

    if (error) throw new Error(error.message)
    return data
  }
}
