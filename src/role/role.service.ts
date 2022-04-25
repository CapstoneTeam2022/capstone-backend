import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllRoles() {
    return this.prisma.role.findMany();
  }

  async getRoleById(id: number) {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });
    if (role === null) {
      throw new ForbiddenException(`Role with id ${id} not found`);
    }
    return role;
  }

  async addRole(name: string) {
    try {
      const role = await this.prisma.role.create({
        data: {
          name,
        },
      });
      return role;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Role with name ${name} already exists`);
        throw new ForbiddenException(`Error: Unable to Create role '${name}'`);
      }
      console.log(err);
      throw err;
    }
  }
}
