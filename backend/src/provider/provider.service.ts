import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientService } from '../client/client.service';
import { ProviderDto } from './dtos/provider.dto';

import { Provider, ProviderDocument } from './schemas/provider.schema';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
    private readonly clientService: ClientService,
  ) {}

  async create(provider: ProviderDto, id: string) {
    try {
      const { data: client } = await this.clientService.getClients(id);

      if (client.length == 0) {
        return {
          data: null,
          error: 'Client Not found',
        };
      }

      const data = await this.providerModel.create({
        ...provider,
      });

      await this.clientService.addProvider(id, data);
      return { data, error: null, statusCode: 201 };
    } catch (e) {
      return {
        data: null,
        error: e.message,
      };
    }
  }

  // update and soft delete route
  async update(id: string, provider: ProviderDto, deleted = false) {
    try {
      const data = await this.providerModel.findByIdAndUpdate(
        id,
        {
          deleted,
          ...provider,
        },
        { new: true },
      );

      return { data, error: null };
    } catch (e) {
      return {
        data: null,
        error: e.message,
      };
    }
  }
}
