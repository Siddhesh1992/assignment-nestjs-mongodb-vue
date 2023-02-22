import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Provider } from 'src/provider/schemas/provider.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Provider' })
  provider: Provider[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
