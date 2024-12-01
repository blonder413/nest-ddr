import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

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

userSchema.pre<User>('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
