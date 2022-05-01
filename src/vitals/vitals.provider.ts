import { Inject, Provider } from "@nestjs/common"
import { vitals } from "./vitals.entity"
import { Connection, Repository } from "typeorm";
import {getRepository} from 'typeorm'
export const vitalsProvider: Provider[] = [
    {
    provide: 'VITALS_REPOSITORY',
    useFactory: () => 
            getRepository(vitals), 
            inject: ['DATABASE_CONNECTION']
             
    },
]