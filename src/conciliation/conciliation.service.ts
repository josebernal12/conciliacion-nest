import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConciliationDto } from './dto/create-conciliation.dto';
import { UpdateConciliationDto } from './dto/update-conciliation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Conciliation } from './entities/conciliation.entity';
import { Model } from 'mongoose';

@Injectable()
export class ConciliationService {
  constructor(
    @InjectModel(Conciliation.name)
    private readonly conciliationModel: Model<Conciliation>,
  ) { }
  async create(createConciliationDto: CreateConciliationDto, userId: string) {
    createConciliationDto.userId = userId
    const conciliation = await this.conciliationModel.create(createConciliationDto)
    // if (!conciliation) throw new BadRequestException('error creating conciliation')
    return conciliation
  }

  async findAll(userId: string, name: string, code: string) {
    if (name && code) {
      const regex = new RegExp(`^${name}`, 'i');
      const regexCode = new RegExp(`^${code}`, 'i');
      const conciliation = await this.conciliationModel.find({ userId, name: regex, code: regexCode })
      if (!conciliation) throw new BadRequestException('error getting conciliation')
      return conciliation
    }
    const conciliation = await this.conciliationModel.find({ userId })
    if (!conciliation) throw new BadRequestException('error getting conciliation')
    return conciliation
  }

  async findOne(id: string) {
    const conciliation = await this.conciliationModel.findById(id)
    if (!conciliation) throw new NotFoundException(`conciliation with id ${id} not found`)
    return conciliation
  }

  async update(id: string, updateConciliationDto: UpdateConciliationDto, userId: string) {
    await this.findOne(id)
    updateConciliationDto.userId = userId
    const conciliation = await this.conciliationModel.findByIdAndUpdate(id, updateConciliationDto, { new: true })
    if (!conciliation) throw new BadRequestException('error updating conciliation')
    return conciliation
  }

  async remove(id: string) {
    await this.findOne(id)
    const conciciliation = await this.conciliationModel.findByIdAndDelete(id)
    if (!conciciliation) throw new BadRequestException('error deleting conciliation')
    return 'conciliation deleted'
  }
}
