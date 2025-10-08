import { UserService } from "../services/userService"
import { Request, Response } from "express"

export class UserRegisterController {
  constructor(private readonly userService: UserService) {}

  async run(req: Request, res: Response) {
    try {
      const { id, name, email, password, confirmPassword } = req.body

      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" })
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" })
      }

      try {
        const user = await this.userService.create(id, name, email, password)

        res.status(201).json({ ok: true, user })
      } catch (error) {
        res.status(400).json({ ok: false, error: (error as Error).message })
      }
    } catch (error) {
      console.error("Error in RegisterPostController:", error)
      res.status(500).json({ ok: false, error: "Internal server error" })
    }
  }
}
