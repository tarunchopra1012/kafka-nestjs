import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KafkaProducerService } from 'src/kafka/kafka-producer.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, KafkaModule],
  exports: [UsersService],
})
export class UsersModule {}
