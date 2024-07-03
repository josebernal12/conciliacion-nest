import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Medication } from './entities/medication.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Medication.name)
    private readonly medicationModel: Model<Medication>,
  ) { }
  async create(createMedicationDto: CreateMedicationDto, userId: string) {
    createMedicationDto.userId = userId
    const medication = await this.medicationModel.create(createMedicationDto);
    if (!medication) throw new BadRequestException('error creating Medication')
    return medication;

  }

  async findAll(userId: string, name: string, code: string) {
    if (name && code) {
      const regex = new RegExp(`^${name}`, 'i');
      const regexCode = new RegExp(`^${code}`, 'i');
      const medications = await this.medicationModel.find({ userId, name: regex, code: regexCode })
      if (!medications) throw new BadRequestException('error searching medications')
      return medications
    }
    const medications = await this.medicationModel.find({ userId })
    if (!medications) throw new BadRequestException('error searching medications')
    return medications
  }

  async findOne(id: string) {
    const medication = await this.medicationModel.findById(id)
    if (!medication) throw new NotFoundException('medication not found')
    return medication
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto, userId: string) {
    if (Object.keys(updateMedicationDto).length === 0) throw new BadRequestException('data is required')
    await this.findOne(id)
    updateMedicationDto.userId = userId
    const medication = await this.medicationModel.findByIdAndUpdate(id, updateMedicationDto, { new: true })
    if (!medication) throw new BadRequestException('error updating medication')
    return medication
  }

  async remove(id: string) {
    await this.findOne(id)
    const response = await this.medicationModel.findByIdAndDelete(id)
    if (!response) throw new BadRequestException('error deleting medications')
    return 'medication deleted'
  }

  async searchMedication(userId: string, name: string, code: string) {
    if (name && code) {
      const medication = await this.medicationModel.findOne({ name, code, userId })
      if (!medication) throw new BadRequestException('error getting medication')
      return medication
    }
  }
}
