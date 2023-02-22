import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ClientDto } from './dtos/client.dto';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: ClientDto) {
    try {
      const data = await this.clientModel.create({
        ...createClientDto,
      });
      return { data, error: null, statusCode: 201 };
    } catch (e) {
      return {
        data: null,
        error: e.message.includes('email_1 dup key')
          ? 'Email Already Taken'
          : e.message,
        statusCode: 300,
      };
    }
  }

  async update(updateClientDto: ClientDto, id: string, deleted = false) {
    try {
      const exists = await this.clientModel.findById(id);

      if (!exists) {
        return {
          data: null,
          error: 'Invalid request',
          statusCode: 400,
        };
      }

      const data = await this.clientModel.findByIdAndUpdate(
        id,
        {
          ...updateClientDto,
          deleted,
        },
        { new: true },
      );

      return { data, error: null };
    } catch (e) {
      return {
        data: null,
        error: e.message.includes('email_1 dup key')
          ? 'Email Already Taken'
          : e.message,
        statusCode: 300,
      };
    }
  }

  async delete(id) {
    try {
      const exists = await this.clientModel.findById(id);

      if (!exists) {
        return {
          data: null,
          error: 'Invalid request',
          statusCode: 400,
        };
      }

      const data = await this.clientModel.findByIdAndUpdate(id, {
        deleted: true,
      });
      return { data, error: null };
    } catch (e) {
      return {
        data: null,
        error: e.message,
      };
    }
  }

  async getClients(id: string) {
    try {
      const data = await this.clientModel
        .find({ ...(id && { _id: id }), deleted: false })
        .populate({ path: 'provider', match: { deleted: false } });
      return { error: null, data };
    } catch (e) {
      return {
        data: null,
        error: e.message,
      };
    }
  }

  async addProvider(id, provider) {
    try {
      const updateProvider = await this.clientModel.findByIdAndUpdate(id, {
        $push: {
          provider,
        },
      });
      return { data: updateProvider, error: null };
    } catch (e) {
      return {
        data: null,
        error: e.message,
      };
    }
  }
}
