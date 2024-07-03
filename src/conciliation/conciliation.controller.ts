import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { ConciliationService } from './conciliation.service';
import { CreateConciliationDto } from './dto/create-conciliation.dto';
import { UpdateConciliationDto } from './dto/update-conciliation.dto';
import { AuthGuard } from 'src/auth/auth-guard.ts/auth.guard';
import { ParseMongoIdPipe } from 'src/common/pipes';

@Controller('conciliation')
export class ConciliationController {
  constructor(private readonly conciliationService: ConciliationService) { }


  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createConciliationDto: CreateConciliationDto, @Req() request: Request) {
    const userId: string = request['user']['id']
    return this.conciliationService.create(createConciliationDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request, @Query('name') name: string, @Query('code') code: string) {
    const userId: string = request['user']['id']
    return this.conciliationService.findAll(userId, name, code);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.conciliationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateConciliationDto: UpdateConciliationDto, @Req() request: Request) {
    const userId: string = request['user']['id']
    return this.conciliationService.update(id, updateConciliationDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.conciliationService.remove(id);
  }
}
