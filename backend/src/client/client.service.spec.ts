import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { Client, ClientDocument } from './schemas/client.schema';
import { Model } from 'mongoose';

const mockRepository = () => ({
  new: jest.fn().mockResolvedValue({ name: 'siddhesh' }),
  constructor: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  exec: jest.fn(),
});

describe('ClientService', () => {
  let service: ClientService;
  let mockClientModel: Model<Client>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getModelToken(Client.name),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    mockClientModel = module.get<Model<Client>>(getModelToken(Client.name));
  });

  describe('client Create', () => {
    it('should create a client', async () => {
      const params = {
        name: 'siddhesh',
        email: 'test@test.com',
        phone: '123-434-2323',
      };
      jest.spyOn(mockClientModel, 'create').mockImplementation(() => params);

      const result = await service.create(params);

      //database check
      expect(mockClientModel.create).toHaveBeenCalledTimes(1);
      expect(mockClientModel.create).toHaveBeenCalledWith(params);

      // service function check
      expect(result.data).toEqual(params);
      expect(result.error).toBeNull();
    });

    it('should throw error', async () => {
      const params = {
        name: 'siddhesh',
        email: null,
        phone: '123-434-2323',
      };
      (mockClientModel.create as jest.Mock).mockRejectedValue(new Error());

      const result = await service.create(params);

      //database check
      expect(mockClientModel.create).toHaveBeenCalledTimes(1);
      // expect(mockClientModel.create).toHaveBeenCalledWith(params);

      // // service function check
      expect(result.data).toBeNull();
      expect(result.statusCode).toEqual(300);
    });
  });

  describe('client Update', () => {
    it('should update a client', async () => {
      const params = {
        name: 'siddhesh updated',
        email: 'test@test.com',
        phone: '123-434-2323',
      };
      const id = '1234567';
      const options = { new: true };
      jest.spyOn(service, 'update');

      jest
        .spyOn(mockClientModel, 'findById')
        .mockImplementation(() => params as any);
      jest
        .spyOn(mockClientModel, 'findByIdAndUpdate')
        .mockImplementation(() => params as any);

      const result = await service.update(params, id);

      //database check
      expect(mockClientModel.findById).toHaveBeenCalledTimes(1);
      expect(mockClientModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        {
          ...params,
          deleted: false,
        },
        options,
      );

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(params, id);

      expect(result.data).toEqual(params);
      expect(result.error).toBeNull();
    });

    it('should throw error when id is not found', async () => {
      const params = {
        name: 'siddhesh',
        email: null,
        phone: '123-434-2323',
      };

      const result = await service.update(params, '12345');
      //database check
      expect(mockClientModel.findById).toHaveBeenCalledTimes(1);
      // expect(mockClientModel.create).toHaveBeenCalledWith(params);

      // // service function check
      expect(result.data).toBeNull();
      expect(result.statusCode).toEqual(400);
    });
  });

  describe('client Soft Delete', () => {
    it('should soft delete a client', async () => {
      const params = {
        name: 'siddhesh updated',
        email: 'test@test.com',
        phone: '123-434-2323',
      };
      const id = '1234567';

      jest.spyOn(service, 'delete');

      jest
        .spyOn(mockClientModel, 'findById')
        .mockImplementation(() => params as any);
      jest
        .spyOn(mockClientModel, 'findByIdAndUpdate')
        .mockImplementation(() => params as any);

      const result = await service.delete(id);

      //database check
      expect(mockClientModel.findById).toHaveBeenCalledTimes(1);
      expect(mockClientModel.findByIdAndUpdate).toHaveBeenCalledWith(id, {
        deleted: true,
      });

      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(id);

      expect(result.data).toEqual(params);
      expect(result.error).toBeNull();
    });

    it('should throw error when id is not found', async () => {
      const params = {
        name: 'siddhesh',
        email: null,
        phone: '123-434-2323',
      };

      const result = await service.update(params, '12345');
      //database check
      expect(mockClientModel.findById).toHaveBeenCalledTimes(1);
      // expect(mockClientModel.create).toHaveBeenCalledWith(params);

      // // service function check
      expect(result.data).toBeNull();
      expect(result.statusCode).toEqual(400);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
