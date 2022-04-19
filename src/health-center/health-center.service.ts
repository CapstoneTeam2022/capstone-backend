import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HealthCenterDto } from './dto';

@Injectable()
export class HealthCenterService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHealthCenters() {
    return this.prisma.healthCenter.findMany();
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
}
