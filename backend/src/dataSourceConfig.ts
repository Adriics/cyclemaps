import "dotenv/config"
import { DataSource, DataSourceOptions } from "typeorm"

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: false,
  logging: true,
  entities: [__dirname + "/models/**/*.{ts,js}"],
  migrations: [__dirname + "/../persistence/*.{ts,js}"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
} as DataSourceOptions)

export default dataSource
