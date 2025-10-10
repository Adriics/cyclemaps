import { Request, Response } from "express"
import { UserService } from "../services/userService"
import jwt from "jsonwebtoken"

export class UserLoginController {
  constructor(private readonly userService: UserService) {}

  async run(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" })

    try {
      const { user } = await this.userService.login(email, password)

      const token = jwt.sign(
        {
          id: user?.id,
          email: user?.email,
          name: user?.user_metadata?.name,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      )
      res.status(200).json({ ok: true, user, token })
    } catch (error) {
      res.status(401).json({
        ok: false,
        message: (error as Error).message || "Invalid credentials",
      })
    }
  }
}
