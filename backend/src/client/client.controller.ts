import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';

import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { handleResponse } from '../utils/handleResponse';
import { ClientService } from './client.service';
import { ClientDto } from './dtos/client.dto';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Client',
    description: 'Create a Client with following details',
  })
  @ApiResponse({ status: 201, description: 'Client Created' })
  @ApiResponse({ status: 300, description: 'Email already Taken' })
  async create(@Body() createClientDto: ClientDto) {
    return handleResponse(await this.clientService.create(createClientDto));
  }

  @Get()
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'A Optional params id to get particular client',
    required: false,
  })
  @ApiOperation({
    summary: 'Fetch all Clients',
    description: 'Fetch all Client or single Client based on id',
  })
  @ApiResponse({ status: 200, description: 'Clients Fetched' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getClient(@Query('id') id: string) {
    return handleResponse(await this.clientService.getClients(id));
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'A Optional params id to get particular client',
    required: true,
  })
  @ApiOperation({
    summary: 'update Clients',
    description: 'Update Client with following Details',
  })
  @ApiResponse({ status: 200, description: 'Clients updated' })
  @ApiResponse({ status: 300, description: 'Email already Taken' })
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: ClientDto,
  ) {
    console.log(id);
    return handleResponse(await this.clientService.update(updateClientDto, id));
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'A params id to delete particular client',
    required: true,
  })
  @ApiOperation({
    summary: 'Delete particular Clients',
    description: 'Delete particular Client',
  })
  @ApiResponse({ status: 200, description: 'Clients deleted' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async deleteClient(@Param('id') id: string) {
    return handleResponse(await this.clientService.update(null, id, true));
  }
}
