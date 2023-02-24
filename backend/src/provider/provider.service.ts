import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProviderDto } from './dtos/provider.dto';

import { Provider, ProviderDocument } from './schemas/provider.schema';

@Injectable()
export class ProviderService implements OnModuleInit {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
  ) {}
  async onModuleInit() {
    const data = [
      { name: 'Provider 1' },
      { name: 'Provider 2' },
      { name: 'Provider 3' },
      { name: 'Provider 4' },
      { name: 'Provider 5' },
    ];

    const createProvider = await this.providerModel.find({
      name: { $in: data.map((e) => e.name) },
    });

    if (createProvider.length === 0) await this.providerModel.insertMany(data);
  }

  async getProvider(provider: string[] = []) {
    try {
      const data = await this.providerModel.find({
        ...(provider.length && { _id: { $in: provider } }),
        deleted: false,
      });

      return { data, error: null };
    } catch (e) {
      return {
        data: null,
        error: e.message,
      };
    }
  }

  async create(provider: ProviderDto) {
    try {
      const data = await this.providerModel.create({
        ...provider,
      });

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
