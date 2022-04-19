import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { exclude } from 'src/utils/helpers/exclude';
import { HealthCenterDto } from './dto';

@Injectable()
export class HealthCenterService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHealthCenters() {
    return this.prisma.healthCenter.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
      },
    });
  }

  async createHealthCenter(body: HealthCenterDto) {
    //check email unique here
    const newHealthCenter = await this.prisma.healthCenter.create({
      data: {
        name: body.name,
        email: body.email,
        type: body.type,
        address: {
          create: {
            ...body.address,
          },
        },
      },
    });
    return newHealthCenter;
  }

  async getHealthCenter(id: number) {
    try {
      const healthCenter = await this.prisma.healthCenter.findUnique({
        where: {
          id,
        },
        include: {
          address: true,
        },
      });
      if (healthCenter === null || healthCenter == undefined) {
        throw new NotFoundException(`Health center with id ${id} not found`);
      }

      //Remove id property from health center address
      exclude(healthCenter.address, 'id');

      //Remove the address and health center
      exclude(healthCenter, 'addressId');

      return {
        ...healthCenter,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateHealthCenter(id: number, body: HealthCenterDto) {
    const healthCenter = await this.prisma.healthCenter.findUnique({
      where: { id },
    });

    if (healthCenter === null) {
      throw new NotFoundException(`Health center with id ${id} not found`);
    }

    const updatedHealthCenter = await this.prisma.healthCenter.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        email: body.email,
        type: body.type,
        address: {
          update: {
            ...body.address,
          },
        },
      },
      include: {
        address: true,
      },
    });
    exclude(updatedHealthCenter.address, 'id');
    exclude(updatedHealthCenter, 'addressId');
    return updatedHealthCenter;
  }

  async deleteHealthCenter(id: number) {
    const healthCenter = await this.prisma.healthCenter.findUnique({
      where: { id },
    });
    if (healthCenter === null) {
      throw new NotFoundException(`Health center with id ${id} not found`);
    }
    await this.prisma.healthCenter.delete({
      where: {
        id,
      },
    });
    return {
      msg: 'success',
    };
  }
}
