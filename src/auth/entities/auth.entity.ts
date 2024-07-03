import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";



@Schema({ timestamps: true })
export class Auth {

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    name: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    password: string;

    @Prop({
        type: String,
        default: null,
        trim: true
    })
    token: string;


}
export const AuthSchema = SchemaFactory.createForClass(Auth);