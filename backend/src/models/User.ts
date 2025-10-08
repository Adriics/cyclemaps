export class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: Promise<string>,
    private readonly createdAt: Date = new Date(),
    private readonly updatedAt: Date = new Date()
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
