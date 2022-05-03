import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  getAllRoles() {
    return this.roleRepository.find();
  }

  async getRoleById(id: number) {
    try {
      return await this.roleRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`Role with id ${id} not found`);
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getRoleByName(name: string) {
    const role = this.roleRepository.findOne({ where: { name } });
    if (role) return role;
    throw new NotFoundException(`Role with name ${name} not found`);
  }

  async addRole(name: string) {
    try {
      const role = this.roleRepository.create({
        name,
      });
      return await this.roleRepository.save(role);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (err.driverError.code && err.driverError.code === '23505') {
          throw new UnprocessableEntityException(
            `Role with name ${name} already exists`,
          );
        }
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
