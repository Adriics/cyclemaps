import { Router } from "express"
import { userRegister } from "./userRegister"

export function registerRoutes(router: Router): Router {
  userRegister(router)

  return router
}
