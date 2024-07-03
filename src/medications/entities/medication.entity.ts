import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Auth } from "src/auth/entities/auth.entity";

@Schema({ timestamps: true })
export class Medication {

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    name: string;

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    code: string;

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    aluminium_bad: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    aluminium_good: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    pvc_tablet: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    blister_bad: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    blister_good: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    qty_blister_per_box: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    qty_plegadizas: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    qty_label_used: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true
    })
    qty_tablets_per_blister: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
        trim: true
    })
    userId: Auth
}

export const MedicationSchema = SchemaFactory.createForClass(Medication);