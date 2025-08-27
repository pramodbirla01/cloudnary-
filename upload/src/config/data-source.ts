import "reflect-metadata";
import { DataSource } from "typeorm";
import { Upload } from "../entities/Upload";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,   // ❗ for dev only
  logging: false,
  entities: [Upload],
});
