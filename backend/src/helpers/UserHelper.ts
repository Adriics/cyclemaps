import { Equal } from "typeorm"
import { User } from "../models/User"
import dataSource from "../dataSourceConfig"

export class UserHelper {
  protected connection = dataSource

  async findById(id: string): Promise<User | null> {
    return dataSource
      .getRepository("User")
      .findOneBy({ id }) as Promise<User | null>
  }

  async create(user: User): Promise<User> {
    return dataSource.getRepository("User").save(user) as Promise<User>
  }

  async findByEmail(email: string): Promise<User | null> {
    return dataSource.getRepository("User").findOneBy({
      email: Equal(email),
    }) as Promise<User | null>
  }
}
