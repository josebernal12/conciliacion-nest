import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { IsObjectId } from "src/common/decorator/is-objectId";

export class CreateMedicationDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    aluminium_bad: string;

    @IsString()
    @IsNotEmpty()
    aluminium_good: string;

    @IsString()
    @IsNotEmpty()
    pvc_tablet: string;

    @IsString()
    @IsNotEmpty()
    blister_bad: string;

    @IsString()
    @IsNotEmpty()
    blister_good: string;

    @IsString()
    @IsNotEmpty()
    qty_blister_per_box: string;

    @IsString()
    @IsNotEmpty()
    qty_plegadizas: string;

    @IsString()
    @IsNotEmpty()
    qty_label_used: string;

    @IsString()
    @IsNotEmpty()
    qty_tablets_per_blister: string;

    userId: string
}
