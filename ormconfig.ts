import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  username: 'sennay',
  password: 'password',
  database: 'db',
  port: 5432,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  logging: true,
};

export default dbConfig;
