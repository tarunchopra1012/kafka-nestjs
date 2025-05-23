import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserRegistration(user: users) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './registration', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.username,
      },
    });
  }
}
