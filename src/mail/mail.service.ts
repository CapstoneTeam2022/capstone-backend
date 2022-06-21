import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {
    const url = `http://localhost:3000/system-admin/MOH/`;

    await this.mailerService.sendMail({
      to: 'redidemisse22@gmail.com',
      subject: 'Welcome to EMR! Confirm your Email',
      html: '<hi>hi</hi>',
      context: {
        name: 'name',
        url,
      },
    });
  }
}
