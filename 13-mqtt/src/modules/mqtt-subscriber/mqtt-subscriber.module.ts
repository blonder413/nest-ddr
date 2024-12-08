import { Module } from '@nestjs/common';
import { MqttSubscriberController } from './mqtt-subscriber.controller';
import { MqttSubscriberService } from './mqtt-subscriber.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { connectionMQTT } from 'src/constants/constants';

@Module({
  controllers: [MqttSubscriberController],
  imports: [
    ClientsModule.register([
      {
        transport: Transport.MQTT,
        name: connectionMQTT.clientID,
        options: {
          url: `mqtt://${connectionMQTT.broker.host}:${connectionMQTT.broker.port}`,
        },
      },
    ]),
  ],
  providers: [MqttSubscriberService],
})
export class MqttSubscriberModule {}
