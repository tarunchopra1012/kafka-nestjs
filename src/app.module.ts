import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configuration from './configuration';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    MailModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, KafkaConsumerService],
  exports: [KafkaConsumerService],
})
export class AppModule {}
