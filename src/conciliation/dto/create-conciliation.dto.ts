import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateConciliationDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsArray()
    mainTableData?: number[][];

    @IsOptional()
    @IsArray()
    secondTableData?: number[][];

    @IsOptional()
    @IsNumber()
    fiveTableData?: number;

    @IsOptional()
    @IsArray()
    tableMerma?: number[][];

    @IsOptional()
    @IsNumber()
    tableAcondicionado?: number;

    @IsOptional()
    @IsNumber()
    hermes?: number;

    @IsOptional()
    @IsNumber()
    tableTeleCamara?: number;

    @IsOptional()
    @IsNumber()
    tableTeleCamara0?: number;

    @IsOptional()
    @IsArray()
    tableFour?: number[][];

    @IsOptional()
    @IsArray()
    factor?: number[][];

    @IsOptional()
    @IsArray()
    lastTable?: number[][];

    @IsOptional()
    @IsArray()
    tableSumatoria?: number[][];

    @IsOptional()
    @IsNumber()
    perfomance?: number;

    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsString()
    medicationId?: string;
}
