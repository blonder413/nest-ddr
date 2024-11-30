import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    type: String,
    unique: true,
    trim: true,
    lowecase: true,
    required: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
