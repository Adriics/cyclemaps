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

  async create(id: string, name: string, email: string, password: string) {
    const exists = await this.userHelper.findById(id)

    if (exists) throw new Error("User already exists")

    const hash = this.hashPassword(password)

    const user = new User(id, name, email, hash, new Date(), new Date())

    const newUser = await this.userHelper.create(user)

    return newUser
  }
}
