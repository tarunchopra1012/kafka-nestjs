import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { KafkaProducerService } from 'src/kafka/kafka-producer.service';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password_hash,
      roundsOfHashing,
    );
    // Emit Kafka event after registering the user
    await this.kafkaProducerService.emitUserRegisteredEvent(createUserDto);
    createUserDto.password_hash = hashedPassword;
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password_hash) {
      updateUserDto.password_hash = await bcrypt.hash(
        updateUserDto.password_hash,
        roundsOfHashing,
      );
    }

    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
