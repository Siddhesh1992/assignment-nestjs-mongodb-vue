import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Client } from 'src/client/schemas/client.schema';

export type ProviderDocument = HydratedDocument<Provider>;

@Schema({ timestamps: true })
export class Provider {
  @Prop()
  name: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
