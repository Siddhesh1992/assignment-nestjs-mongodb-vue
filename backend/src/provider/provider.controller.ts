import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { handleResponse } from 'src/utils/handleResponse';
import { ProviderDto } from './dtos/provider.dto';
import { ProviderService } from './provider.service';

@ApiTags('provider')
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Provider master',
    description: 'Create all Provider masters',
  })
  @ApiResponse({ status: 201, description: 'Provider Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getProvider() {
    return handleResponse(await this.providerService.getProvider());
  }

  @Post()
  @ApiOperation({
    summary: 'Create Provider',
    description: 'Create a Provider with following details',
  })
  @ApiResponse({ status: 201, description: 'Provider Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createProviderDto: ProviderDto) {
    return handleResponse(await this.providerService.create(createProviderDto));
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update Provider',
    description: 'Update a Provider with following details',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'A params id to delete particular client',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Provider Updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateProviderDto: ProviderDto,
  ) {
    return handleResponse(
      await this.providerService.update(id, updateProviderDto),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Provider',
    description: 'Delete a Provider',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'A params id to delete particular client',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Provider Deleted' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async delete(@Param('id') id: string) {
    return handleResponse(await this.providerService.update(id, null, true));
  }
}
