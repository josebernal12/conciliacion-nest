import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Medication, MedicationSchema } from './entities/medication.entity';

@Module({
  controllers: [MedicationsController],
  providers: [MedicationsService],
  imports: [
    
    MongooseModule.forFeature([{ name: Medication.name, schema: MedicationSchema }])
  ]
})
export class MedicationsModule { }
