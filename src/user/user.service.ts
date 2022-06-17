import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Between, Brackets, DeleteResult, Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { RoleService } from '../role/role.service';
import * as argon2 from 'argon2';
import { UpdatePasswordDto, UpdateUserDto, UserDto } from './dto';
import { HealthCenterService } from '../health-center/health-center.service';
import { HealthCenterWithAdminDto } from '../health-center/dto/health-center-with-admin.dto';

interface Options {
  select: (keyof User)[];
}

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => HealthCenterService))
    private healthCenterService: HealthCenterService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private addressService: AddressService,
    private roleService: RoleService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['address', 'role'] });
  }

  async getEmployeeCount() {
    return this.userRepository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.healthCenter', 'h')
      .leftJoinAndSelect('u.role', 'r')
      .where('r.name=:name', { name: 'Nurse' })
      .orWhere('r.name=:name', { name: 'Doctor' })
      .orWhere('r.name=:name', { name: 'Receptionist' })
      .orWhere('r.name=:name', { name: 'Hospital Admin' })
      .orWhere('r.name=:name', { name: 'Lab Expert' })
      .orWhere('r.name=:name', { name: 'Radiologist' })
      .orWhere('r.name=:name', { name: 'Employee' })
      .orWhere('r.name=:name', { name: 'Researcher' })
      .orWhere('r.name=:name', { name: 'MohEmployee' })
      .groupBy('h.id')
      .select(['count(h.id) as employees', 'h.id as id'])
      .getQuery();
  }
  //type Options = FindOneOptions<Entity>.select?: (keyof User)[];
  async getAllInDateRangeForRole(
    roleName: string,
    start: Date,
    end: Date,
    options?: Options,
  ) {
    await this.roleService.getRoleByName(roleName); // check that role exists
    console.log(roleName);
    // let select: (keyof User)[] | null = options.select;
    return this.userRepository.find({
      where: {
        createdAt: Between(start, end),
        role: {
          name: roleName,
        },
      },
      relations: ['role'],
      select: options?.select || null,
    });
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['address', 'role', 'healthCenter'],
    });
    if (user) return user;

    throw new NotFoundException(`The user with id ${id} not found`);
  }

  async isEmailTaken(email) {
    const user = await this.userRepository.findOne({
      email,
    });
    return user !== undefined;
  }

  async addUser(userData: UserDto, roleName: string) {
    const { address, healthCenterId, ...newUser } = userData;

    if (await this.isEmailTaken(newUser.email)) {
      throw new BadRequestException('The Email is Already in use');
    }

    const role = await this.roleService.getRoleByName(roleName);
    const healthCenter = await this.healthCenterService.getOneHealthCenter(
      healthCenterId,
    );

    const createdAddress = await this.addressService.saveAddress(address);

    // Hashing the password
    const password = await argon2.hash('12345678');

    const user = this.userRepository.create({
      ...newUser,
      address: createdAddress,
      role,
      password: password,
      healthCenter,
    });

    const createdUser = await this.userRepository.save(user);
    delete createdUser.password;
    return createdUser;
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.getUser(id); //check if user exists
    //if email is different
    if (user.email !== data.email) {
      if (await this.isEmailTaken(data.email)) {
        throw new BadRequestException('The Email is Already in use');
      }
    }
    const oldAddress = await this.addressService.getAddress(user.address.id);
    //password update is not included
    const { address, ...newUser } = data;

    await this.addressService.updateAddress(oldAddress.id, address);

    return this.userRepository.update(
      {
        id,
      },
      newUser,
    );
  }

  async updateProfileImage(id: number, image: string) {
    const user = await this.getUser(id);
    user.image = image;
    return this.userRepository.save(user);
  }

  async deactivateUser(id: number) {
    const user = await this.getUser(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  findAllByRoleId(roleId: number) {
    return this.userRepository.find({
      where: {
        role: {
          id: roleId,
        },
      },
    });
  }

  findAllByRoleName(name: string) {
    return this.userRepository.find({
      where: {
        role: {
          name,
        },
      },
      relations: ['role', 'address'],
    });
  }

  findAllByRoles(...names: string[]) {
    return this.userRepository.find({
      //  where: [{ role: { name: '' } }],
      where: names.map((name) => ({ role: { name } })),
      relations: ['role', 'address'],
    });
  }

  async findEmployeeCountForHealthCenter(id: number) {
    await this.healthCenterService.getOneHealthCenter(id);
    const names = [
      'Doctor',
      'Nurse',
      'Receptionist',
      'Hospital Admin',
      'Lab Expert',
      'Radiologist',
    ];
    return this.userRepository.find({
      //  where: [{ role: { name: '' } }],
      where: {
        ...names.map((name) => ({ role: { name } })),
        healthCenter: {
          id,
        },
      },
      relations: ['role'],
    });
  }

  async findOneByRoleName(id: number, name: string, ...relations: string[]) {
    const user = await this.userRepository.findOne({
      where: {
        id,
        role: {
          name,
        },
      },
      relations: ['role', ...relations],
    });
    if (user) return user;
    throw new NotFoundException(`${name} with id ${id} not found`);
  }

  async findAllEmployeesForHospital(healthCenterId: number) {
    await this.healthCenterService.getOneHealthCenter(healthCenterId);
    return (
      this.userRepository
        .createQueryBuilder('u')
        .innerJoinAndSelect('u.healthCenter', 'h')
        .innerJoinAndSelect('u.role', 'r')
        .where('h.id=:id', { id: healthCenterId })
        .andWhere(
          new Brackets((qb) => {
            qb.where('r.name=:name', { name: 'Nurse' })
              .orWhere('r.name=:name1', { name1: 'Doctor' })
              .orWhere('r.name=:name2', { name2: 'Receptionist' })
              .orWhere('r.name=:name3', { name3: 'Hospital Admin' })
              .orWhere('r.name=:name4', { name4: 'LabExpert' })
              .orWhere('r.name=:name5', { name5: 'Radiologist' })
              .orWhere('r.name=:name6', { name6: 'Employee' })
              .orWhere('r.name=:name7', { name7: 'Researcher' })
              .orWhere('r.name=:name8', { name8: 'MohEmployee' });
          }),
        )
        // .andWhere('r.name=:name', { name: 'Nurse' })
        // .orWhere('r.name=:name1', { name1: 'Doctor' })
        // .orWhere('r.name=:name2', { name2: 'Receptionist' })
        // .orWhere('r.name=:name3', { name3: 'Hospital Admin' })
        // .orWhere('r.name=:name4', { name4: 'Lab Expert' })
        // .orWhere('r.name=:name5', { name5: 'Radiologist' })
        // .orWhere('r.name=:name6', { name6: 'Employee' })
        // .orWhere('r.name=:name7', { name7: 'Researcher' })
        // .orWhere('r.name=:name8', { name8: 'MohEmployee' })
        .select(['u', 'r', 'h'])
        .getMany()
    );
  }

  async updatePassword(userId: number, data: UpdatePasswordDto) {
    const { oldPassword, newPassword } = data;
    const user = await this.userRepository.findOne(userId, {
      select: ['password'],
    });
    const passwordsMatch = await argon2.verify(user.password, oldPassword);
    if (!passwordsMatch) {
      throw new ForbiddenException('Invalid Password');
    }
    const hash = await argon2.hash(newPassword);
    user.isPasswordReset = true;
    await this.userRepository.update(userId, { password: hash });
    return { msg: 'success' };
  }

  async getHealthCenterForUser(userId: number) {
    const user = await this.getUser(userId);
    return user.healthCenter;
  }
}
