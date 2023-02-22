import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProviderService } from './provider.service';
import { Provider } from './schemas/provider.schema';
import { Model } from 'mongoose';
import { ClientService } from '../client/client.service';
import { Client } from '../client/schemas/client.schema';

const mockRepository = () => ({
  new: jest.fn().mockResolvedValue({ name: 'siddhesh' }),
  constructor: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  exec: jest.fn(),
});

describe('ProviderService', () => {
  let service: ProviderService;
  let mockProviderModel: Model<Provider>;
  let clientService: ClientService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderService,
        ClientService,
        {
          provide: getModelToken(Provider.name),
          useValue: mockRepository(),
        },
        {
          provide: getModelToken(Client.name),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProviderService>(ProviderService);
    clientService = module.get<ClientService>(ClientService);
    mockProviderModel = module.get<Model<Provider>>(
      getModelToken(Provider.name),
    );
  });

  describe('Provider Create', () => {
    it('should create a provider', async () => {
      const params = {
        name: 'provider',
      };

      const returnData = { error: null, data: [params] } as any;
      const id = '123456';
      jest
        .spyOn(clientService, 'getClients')
        .mockImplementation(() => returnData);
      jest
        .spyOn(clientService, 'addProvider')
        .mockImplementation(() => returnData);
      jest.spyOn(mockProviderModel, 'create').mockImplementation(() => params);

      const result = await service.create(params, id);

      //database check
      expect(mockProviderModel.create).toHaveBeenCalledTimes(1);
      expect(mockProviderModel.create).toHaveBeenCalledWith(params);

      // service function check
      expect(result.data).toEqual(params);
      expect(result.error).toBeNull();
    });

    it('should throw error', async () => {
      const params = {
        name: 'provider',
      };

      const returnData = { error: null, data: [] } as any;
      const id = '123456';
      jest
        .spyOn(clientService, 'getClients')
        .mockImplementation(() => returnData);

      const result = await service.create(params, id);
      // service function check
      expect(result.data).toBeNull();
      expect(result.error).toEqual('Client Not found');
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
