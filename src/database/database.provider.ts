import { createConnection } from "typeorm";
import { vitals } from "../vitals/vitals.entity";


export const databaseProvider = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            await createConnection({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'PasswordSami',
                database: 'feedDB',
                entities: [vitals],
                synchronize: true
            });
        },
    },
]