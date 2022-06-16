import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';

//Check if ssl is enabled
const sslVal = process.env.ENABLE_SSL;

let isSSlEnabled = false;
if (sslVal === 'true') {
  isSSlEnabled = true;
}

const ssl = isSSlEnabled ? { rejectUnauthorized: false } : false;

const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  // username: 'vskfyyhakpxwyl',
  // password: 'e8bc2f478caa0378d17e0ad0155601663dbd900e5756467157cc90093cc8bedc',
  // database: 'd6p1qmadbqj9gq',
  // host: 'ec2-34-194-73-236.compute-1.amazonaws.com',
  port: Number(process.env.POSTGRES_PORT),
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  logging: true,
  ssl,
};

export default dbConfig;
