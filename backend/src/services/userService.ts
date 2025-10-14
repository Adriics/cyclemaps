import { createHmac } from "crypto"
import { UserHelper } from "../helpers/UserHelper"
import { User } from "../models/User"

export class UserService {
  constructor(private readonly userHelper: UserHelper) {}

  async hashPassword(password: string): Promise<string> {
    const hashGeneratos = createHmac("sha512", "salt")
    const hash = hashGeneratos.update(password).digest("hex")
    return hash
  }

  async create(name: string, email: string, password: string) {
    // Buscar por email en lugar de id
    const exists = await this.userHelper.findByEmail(email)

    if (exists) throw new Error("User already exists")

    const hash = await this.hashPassword(password)

    // No pasamos id, dejamos que TypeORM lo genere
    const user = new User(name, email, hash)

    const newUser = await this.userHelper.create(user)

    return newUser
  }
}
