import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import * as dotenv from "dotenv";
dotenv.config();

export const orm = await MikroORM.init({
    entities:["dist/entities/*.js"],
    entitiesTs:["src/entities/*.ts"],
    dbName: process.env.DB_NAME,
    clientUrl: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    driver: MySqlDriver,
    debug: true,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
}