import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthCenterService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHealthCenters() {
    return this.prisma.healthCenter.findMany();
  }
}
