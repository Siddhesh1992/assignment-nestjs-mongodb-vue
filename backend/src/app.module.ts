import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ClientModule,
    ProviderModule,
  ],
})
export class AppModule {}
