import { Module, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { exclude } from 'src/utils/helpers/exclude';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import * as argon from 'argon2';

@Module({
  providers: [UserService],
})
export class UserModule {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        age: true,
        gender: true,
        email: true,
        isActive: true,
        isAdmin: true,
        isResearcher: true,
        role: {
          select: {
            name: true,
          },
        },
        address: {
          select: {
            city: true,
            subCity: true,
            zone: true,
            woreda: true,
            kebelle: true,
            street: true,
            houseNo: true,
          },
        },
      },
    });

    return users;
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        address: {
          select: {
            city: true,
            subCity: true,
            zone: true,
            woreda: true,
            kebelle: true,
            street: true,
            houseNo: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    const filteredUser = exclude(user, 'password', 'addressId', 'roleId');

    return filteredUser;
  }

  async createUser({ roleId, ...user }: UserDto) {
    const password = await argon.hash(user.password);
    //Modify this later to use RoleService
    const role = await this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });
    if (role === null) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }
    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        password,
        role: {
          connect: {
            id: role.id,
          },
        },
        address: {
          create: {
            ...user.address,
          },
        },
      },
      include: {
        address: {
          select: {
            city: true,
            subCity: true,
            zone: true,
            woreda: true,
            kebelle: true,
            street: true,
            houseNo: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    const filteredUser = exclude(newUser, 'password', 'addressId', 'roleId');
    return filteredUser;
  }
}
