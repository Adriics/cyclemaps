// src/controllers/UserRegisterController.ts
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserService } from "../services/userService"

export class UserRegisterController {
  constructor(private readonly userService: UserService) {}

  async run(req: Request, res: Response) {
    const { email, password, confirmPassword, name } = req.body

    if (!email || !password || !confirmPassword || !name)
      return res.status(400).json({ message: "All fields are required" })

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" })

    try {
      const user = await this.userService.create(email, password, name)

      const token = jwt.sign(
        {
          id: user.user?.id,
          email: user.user?.email,
          name: user.user?.user_metadata?.name,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      )

      res.status(201).json({ ok: true, user, token })
    } catch (error) {
      res
        .status(400)
        .json({ ok: false, message: (error as Error).message || "Error" })
    }
  }
}
