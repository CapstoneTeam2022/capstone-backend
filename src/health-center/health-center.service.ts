import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthCenter } from './healthcenter.entity';
import { Between, Connection, Repository } from 'typeorm';
import { HealthCenterDto } from './dto';
import { AddressService } from '../address/address.service';
import { Address } from '../address/address.entity';
import { HealthCenterWithAdminDto } from './dto/health-center-with-admin.dto';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class HealthCenterService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectRepository(HealthCenter)
    private healthCenterRepository: Repository<HealthCenter>,
    private addressService: AddressService,
    private roleService: RoleService,
    private connection: Connection,
  ) {}

  getAllHealthCenters() {
    return this.healthCenterRepository.find({
      relations: ['address'],
    });
  }

  getAllHealthCenterswithUsers() {
    return this.healthCenterRepository.find({
      relations: ['address', 'users'],
    });
  }

  async getAllInDateRange(start: Date, end: Date) {
    const hospitals = await this.healthCenterRepository.find({
      where: {
        createdAt: Between(start, end),
      },
      select: ['name'],
    });

    return hospitals.map((hospital) => hospital.name);
  }

  // getEmployeeCount() {
  //   return this.healthCenterRepository
  //     .createQueryBuilder('h')
  //     .innerJoinAndSelect('h.user', 'u')
  //     .select(['h.id'])
  //     .getMany();
  // }

  async create({ address, ...health }: HealthCenterDto) {
    const isTaken = await this.isEmailTaken(health.email);
    if (isTaken) {
      throw new BadRequestException('Email is not available');
    }
    const createdAddress = await this.addressService.saveAddress(address);
    const hc = this.healthCenterRepository.create({
      ...health,
      address: createdAddress,
    });
    return this.healthCenterRepository.save(hc);
  }

  async isEmailTaken(email: string) {
    const hc = await this.healthCenterRepository.findOne({
      where: {
        email,
      },
    });

    return hc !== undefined;
  }

  async createWithTransaction({ address, ...health }: HealthCenterDto) {
    if (await this.isEmailTaken(health.email)) {
      throw new BadRequestException('Email is in use');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;
    const addressRepo = manager.getRepository(Address);
    const hcRepo = manager.getRepository(HealthCenter);
    try {
      const createdAddress = await addressRepo.save({ ...address });
      const healthCenter = await hcRepo.save({
        ...health,
        address: createdAddress,
      });
      await queryRunner.commitTransaction();
      return healthCenter;
    } catch (err) {
      console.log('Error type is: ', typeof err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }


  async getHealthcenter(healthcenter: string){
    const healthCenter = await this.healthCenterRepository.findOne(
      {
        where: {
          name: {
             healthcenter,
          }
        
        }, relations:['users']
      }, 
    )
    if (healthCenter) return healthCenter.users;
    else {
      return [];
    }
  }

  async getOneHealthCenter(id: number): Promise<HealthCenter> {
    const healthCenter = await this.healthCenterRepository.findOne(id, {
      relations: ['address'],
    });
    if (healthCenter) return healthCenter;

    throw new NotFoundException(`Health Center with id ${id} not found`);
  }

  async updateHealthCenter(
    hcId: number,
    updateHCData: HealthCenterDto,
  ): Promise<HealthCenter> {
    const healthCenter = await this.getOneHealthCenter(hcId);

    Object.assign(healthCenter, updateHCData);
    return this.healthCenterRepository.save(healthCenter);
  }

  async getNumOfHealthCenters() {
    const num = (await this.healthCenterRepository.find()).length;
    return num;
  }

  // async createHealthCenterWithAdmin(body: HealthCenterWithAdminDto) {
  //   return this
  // }

  async createHealthCenterWithAdmin({
    admin,
    ...healthCenter
  }: HealthCenterWithAdminDto) {
    const newHc = await this.create(healthCenter);
    const user = await this.userService.addUser(
      {
        ...admin,
        isResearcher: false,
        isAdmin: true,
        image: "",
        healthCenterId: newHc.id,
      },
      'Hospital Admin',
    );
    return {
      healthCenter: {
        ...newHc,
        admin: user,
      },
    };
  }
}
