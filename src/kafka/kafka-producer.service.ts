import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private readonly producer = this.kafka.producer();

  constructor() {
    this.producer.connect().catch(console.error);
  }
  async emitUserRegisteredEvent(userData: any) {
    await this.producer.send({
      topic: 'user-registered', // Topic name
      messages: [{ key: 'user-registration', value: JSON.stringify(userData) }],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
