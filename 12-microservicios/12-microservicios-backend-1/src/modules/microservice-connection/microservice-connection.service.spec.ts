import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceConnectionService } from './microservice-connection.service';

describe('MicroserviceConnectionService', () => {
  let service: MicroserviceConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroserviceConnectionService],
    }).compile();

    service = module.get<MicroserviceConnectionService>(MicroserviceConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
