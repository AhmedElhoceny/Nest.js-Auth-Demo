import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export type userDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: String
    @Prop()
    FullName : string
    @Prop()
    UserName : string
    @Prop()
    PassWord : string
    @Prop()
    Email : string
    @Prop()
    Phone : string
}
export const UserSchema = SchemaFactory.createForClass(User);
