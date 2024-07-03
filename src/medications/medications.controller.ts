import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ParseMongoIdPipe } from 'src/common/pipes';
import { AuthGuard } from 'src/auth/auth-guard.ts/auth.guard';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto, @Req() request: Request) {
    const userId: string = request['user']['id']
    return this.medicationsService.create(createMedicationDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request, @Query('name') name: string, @Query('code') code: string) {
    const userId = request['user']['id']
    return this.medicationsService.findAll(userId, name, code);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.medicationsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateMedicationDto: UpdateMedicationDto, @Req() request: Request) {
    const userId: string = request['user']['id']
    return this.medicationsService.update(id, updateMedicationDto, userId);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.medicationsService.remove(id);
  }
}
