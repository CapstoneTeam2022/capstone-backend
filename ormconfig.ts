import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';

//Check if ssl is enabled
const sslVal = process.env.ENABLE_SSL;
console.log('Value', sslVal, typeof sslVal);
let isSSlEnabled = false;
if (sslVal === 'true') {
  isSSlEnabled = true;
}

const ssl = isSSlEnabled ? { rejectUnauthorized: false } : false;

// if (
//   isSSlEnabled === undefined ||
//   isSSlEnabled === null ||
//   isSSlEnabled === false
// ) {
//   isSSlEnabled = false;
// } else {
//   isSSlEnabled = true;
// }
//
// const ssl = isSSlEnabled
//   ? {
//       rejectUnauthorized: false,
//     }
//   : false;
//
// console.log(isSSlEnabled, ssl);

const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
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
