import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Auth } from "src/auth/entities/auth.entity";
import { Medication } from "src/medications/entities/medication.entity";

@Schema({ timestamps: true })
export class Conciliation {

    @Prop({
        type: String,
        trim: true
    })
    name: string;


    @Prop({
        type: String,
        trim: true
    })
    code: string;

    @Prop([
        [{
            type: Number,
            trim: true
        }]
    ])
    mainTableData: number[][]

    @Prop([
        [{
            type: Number,
            trim: true
        }]
    ])
    secondTableData: number[][]

    @Prop({
        type: Number,
        trim: true
    })
    fiveTableData: number

    @Prop([
        [{
            type: Number,
            trim: true
        }]
    ])
    tableMerma: number[][]

    @Prop({
        type: Number,
        trim: true
    })
    tableAcondicionado: number

    @Prop({
        type: Number,
        trim: true
    })
    hermes: number

    @Prop({
        type: Number,
        trim: true
    })
    tableTeleCamara: number;

    @Prop({
        type: Number,
        trim: true
    })
    tableTeleCamara0: number;

    @Prop([
        [{
            type: Number,
            trim: true
        }]
    ])
    tableFour: number[][]

    @Prop([
        [{
            type: Number,
            trim: true
        }]
    ])
    factor: number[][]

    @Prop([
        [{
            type: Number,
            trim: true
        }]
    ])
    lastTable: number[][]


    @Prop([
        [{
            type: Number,
            trim: true
        }]
    ])
    tableSumatoria: number[][]


    @Prop({
        type: Number,
        trim: true
    })
    perfomance: number

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        trim: true
    })
    userId: Auth

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medication',
        trim: true
    })
    medicationId: Medication
}

export const ConciliationSchema = SchemaFactory.createForClass(Conciliation)