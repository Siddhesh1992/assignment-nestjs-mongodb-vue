import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProviderService } from './provider.service';
import { Provider, ProviderSchema } from './schemas/provider.schema';
import { ProviderController } from './provider.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  providers: [ProviderService],
  exports: [ProviderService],
  controllers: [ProviderController],
})
export class ProviderModule {}
